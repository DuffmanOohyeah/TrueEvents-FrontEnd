import { Tabs, Tab } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getLocalStorage } from '../../stores/localStorage';
import { listEvents, listUserEventJoins, listFavourites, getEvent } from '../../graphql/queries';
import {
	createUserEventJoin,
	//deleteUserEventJoin,
	createFavourite,
	deleteFavourite
} from '../../graphql/mutations';
import moment from 'moment';
import { getStorage } from '../../utils/awsStorage';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { GET_SETTING } from '../../queries/settings/get';
import TabPanel from './tabPanel';
import ShowRecommendedCards from './showRecommendedCards';
import ShowEventCards from './showEventCards';
import ShowNotifications from './showNotifications';
import CmsBreadcrumb from '../../utils/cmsBreadcrumb';
import CmsHeader from '../../utils/cmsHeader';


interface Props {};


const Dashboard: any = (props: Props) => {

	let userId: string = getLocalStorage('userId');
	let firstName: string = getLocalStorage('userFirstName');
	let email: string = getLocalStorage('userEmail');
	let clientId: string = getLocalStorage('clientId');

	const [appName, setAppName]: any = useState('');
	const [tabValue, setTabValue]: any = useState(1);
	const [evtId2Delete, setEvtId2Delete]: any = useState('');
	//const [allEvents, setAllEvents]: any = useState([]);
	const [faveEvents, setFaveEvents]: any = useState([]);
	const [pastEvents, setPastEvents]: any = useState([]);
	const [upcomingEvents, setUpcomingEvents]: any = useState([]);
	const [joinEventIds, setJoinEventIds]: any = useState([]);

	const [getSetting]: any = useLazyQuery(GET_SETTING, {
		variables: {filter: {setting: {eq: 'app_name'}}},
		onCompleted: (data: any) => {
			//console.log('data:', data);
			if( !appName.length ){
				try{
					setAppName(data.listSettings.items[0].value);
				}catch( err: any ){}
			}
		}
	});

	const getFaveEvts: any = async () => {
		const params: any = {
			filter: {
				cognito_sub: {eq: userId},
				client_id: {eq: clientId},
				//event_id: {eq: '?'},
				session_id: {eq: null},
				presenter_id: {eq: null}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listFavourites, params ));
		const faves: any[] = (result.data.listFavourites.items || []);
		const tmpEvts: any[] = [];

		for( let idx: number = 0; idx < faves.length; idx++ ){
			const row: any = faves[idx];
			const evt: any = await API.graphql(graphqlOperation( getEvent, {id: row.event_id} ));
			//console.log('evt:', evt);
			tmpEvts.push(evt.data.getEvent);
		}

		const sorted: any[] = doArraySort(tmpEvts);
		setFaveEvents(sorted);
	};

	/*const [getEvtJoins2Save]: any = useLazyQuery(gql`${listUserEventJoins}`, {
		variables: {filter: {
			cognito_sub: {eq: userId},
			client_id: {eq: clientId}
		}},
		onCompleted: (data: any) => {
			const joins: any[] = (data.listUserEventJoins.items || []);
			const tmpFaveEvts: string[] = [];

			joins.map((row: any) => tmpFaveEvts.push(row.event.id));

			const arr: any[] = allEvents.filter((evt: any) => {
				return ( tmpFaveEvts.indexOf(evt.id) > -1 );
			});

			const sorted: any[] = doArraySort(arr);
			setFaveEvents(sorted);
		}
	});*/

	/*const [getEvtJoins2Delete]: any = useLazyQuery(gql`${listUserEventJoins}`, {
		variables: {filter: {
			cognito_sub: {eq: userId},
			client_id: {eq: clientId}
		}},
		onCompleted: (data: any) => {
			try{
				const joins: any[] = (data.listUserEventJoins.items || []);

				joins.map((row: any) => {
					if( row.event.id == evtId2Delete ){
						const input: any = {
							input: {id: row.id}
						};
						deleteEvtJoin({variables: input});
					}
				});

				//getEvtJoins2Save();	// reset fave state
				getFaveEvts();
			}catch( err: any ){}
		}
	});*/

	//const [createEvtJoin]: any = useMutation(gql`${createUserEventJoin}`);

	//const [deleteEvtJoin]: any = useMutation(gql`${deleteUserEventJoin}`);

	const handleChange: any = (evt: any, newValue: number) => {
		evt.preventDefault();
		setTabValue(newValue);
	};

	const addFaveEvt: any = async (eventId: string) => {
		if( eventId ){
			/* start: add to favourites table */
			const faveParams: any = {
				input: {
					cognito_sub: userId,
					client_id: clientId,
					event_id: eventId,
					session_id: null,
					presenter_id: null
				}
			};
			await API.graphql(graphqlOperation( createFavourite, faveParams ));	// slow process for fave state set below - for accuracy
			/* end: add to favourites table */

			/* start: add to user/event join table */
			//const faveIds: string[] = [];
			//faveEvents.map((row: any) => faveIds.push(row.id));

			if( joinEventIds.indexOf(eventId) == -1 ){
				const joinParams: any = {
					input: {
						cognito_sub: userId,
						client_id: clientId,
						userEventJoinEventId: eventId
					}
				};
				API.graphql(graphqlOperation( createUserEventJoin, joinParams ));
			}
			/* end: add to user/event join table */

			//getEvtJoins2Save();	// reset fave state
			getFaveEvts();
		}
	};

	const deleteFaveEvt: any = async (eventId: string) => {
		//evt.preventDefault();
		//let eventId: string = evt.target.getAttribute('data-eventid');
		//console.log('eventId:', eventId);

		if( eventId ){
			setEvtId2Delete(eventId);
			//getEvtJoins2Delete();

			/* start: delete from favourites table */
			const listFaveParams: any = {
				filter: {
					cognito_sub: {eq: userId},
					client_id: {eq: clientId},
					event_id: {eq: eventId},
					session_id: {eq: null},
					presenter_id: {eq: null}
				}
			};
			const faves: any = await API.graphql(graphqlOperation( listFavourites, listFaveParams ));

			faves.data.listFavourites.items.map((row: any) => {
				if( row.id ){
					const delFaveParams: any = {
						input: {id: row.id}
					};
					API.graphql(graphqlOperation( deleteFavourite, delFaveParams ));
				}
			});
			/* end: delete from favourites table */

			getFaveEvts();
		}
	};

	const getUpcoming: any = (events: any[]) => {
		const arr: any[] = events.filter((evt: any) => {
			return ( moment().diff(evt.end_date) < 0 );
		});

		if( arr.length ){
			const sorted: any[] = doArraySort(arr);
			//console.log('sorted:', sorted);
			setUpcomingEvents(sorted);
		}
	};

	const getPast: any = (events: any[]) => {
		const arr: any[] = events.filter((evt: any) => {
			return ( moment().diff(evt.end_date) > 0 );
		});

		if( arr.length ){
			const sorted: any[] = doArraySort(arr);
			setPastEvents(sorted);
		}
	};

	const doArraySort: any = (arr: any[]) => {
		return(
			arr.sort((a: any, b: any) => {
				let sd1: any = new Date(a.start_date);
				let sd2: any = new Date(b.start_date);
				return ( sd1 - sd2 );
				//return ( moment(a.start_date) - moment(b.start_date) );
			})
		);
	};

	const getAllEvents: any = async () => {
		const params: any = {
			filter: {client_id: {eq: clientId}}
		};

		const result: any = await API.graphql(graphqlOperation( listEvents, params ));
		//console.log('getAllEvents:', result);

		if( result.data.listEvents.items ){
			const tmpArr: any[] = [];

			for( let idx: number = 0; idx < result.data.listEvents.items.length; idx++ ){
				const row: any = result.data.listEvents.items[idx];
				let evtLogo: string = '';

				if( row.event_logo ){
					const s3Obj: any = await getStorage(row.event_logo);
					if( s3Obj.success ){
						evtLogo = s3Obj.data;
					}
				}

				tmpArr.push({
					id: row.id,
					event_name: row.event_name,
					event_desc: row.event_desc,
					start_date: row.start_date,
					end_date: row.end_date,
					event_logo: evtLogo,
					primary_domain: row.primary_domain,
					archived: row.archived
				});
			};

			if( tmpArr.length ){
				//setAllEvents(tmpArr);
				getUpcoming(tmpArr);
				getPast(tmpArr);
				/*if( userId ){
					getEvtJoins2Save();
				}*/
				getFaveEvts();
			}
		}
	};

	const getEventJoins: any = async () => {
		const params: any = {
			filter: {
				cognito_sub: {eq: userId},
				client_id: {eq: clientId}
			}
		};
		const result: any = await API.graphql(graphqlOperation( listUserEventJoins, params ));
		const joins: any[] = (result.data.listUserEventJoins.items || []);
		const tmpIds: string[] = [];

		joins.map((row: any) => {
			if( row.event && tmpIds.indexOf(row.event.id) == -1 ){
				tmpIds.push(row.event.id);
			}
		});

		if( tmpIds.length ){
			setJoinEventIds(tmpIds);
		}
	};

	useEffect(() => {
		getSetting();
		getAllEvents();
		getEventJoins();
		getFaveEvts();
	}, []);

	return (
		<div>

			<CmsBreadcrumb section="Dashboard" />
			<header>
				<h4>Welcome to {appName}</h4>
				Hello {firstName || email}!
				<br /><br />
				Please use the left navigation to access the categories you wish to view.
			</header>
			<CmsHeader showEventInfo="false" />

			<br />
			<Tabs value={tabValue}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					onChange={handleChange}>
				<Tab label="Recommended" />
				<Tab label="Upcoming" />
				<Tab label="Past" />
				<Tab label="My Favourites" />
				<Tab label="Notifications" />
			</Tabs>

			<TabPanel value={tabValue} index={0}>
				<ShowRecommendedCards />
			</TabPanel>

			<TabPanel value={tabValue} index={1}>
				<ShowEventCards eventArr={upcomingEvents}
					faveArr={faveEvents}
					addFave={addFaveEvt}
					deleteFave={deleteFaveEvt} />
			</TabPanel>

			<TabPanel value={tabValue} index={2}>
				<ShowEventCards eventArr={pastEvents}
					faveArr={faveEvents}
					addFave={addFaveEvt}
					deleteFave={deleteFaveEvt} />
			</TabPanel>

			<TabPanel value={tabValue} index={3}>
				<ShowEventCards eventArr={faveEvents}
					faveArr={faveEvents}
					addFave={addFaveEvt}
					deleteFave={deleteFaveEvt} />
			</TabPanel>

			<TabPanel value={tabValue} index={4}>
				<ShowNotifications />
			</TabPanel>

		</div>
	);

};


export default Dashboard;