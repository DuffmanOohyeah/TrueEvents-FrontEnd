import { useState, useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { clientIdVar, userIdVar, eventIdVar } from '../../../../../stores/cache';
import { API, graphqlOperation } from 'aws-amplify';
import {
	getEvent,
	listFavourites,
	getSession,
	getPresenter
} from '../../../../../graphql/queries';
import CmsBreadcrumb from '../../../../../utils/cmsBreadcrumb';
import { getStorage } from '../../../../../utils/awsStorage';
import moment from 'moment';
import Event from './event';


interface Props {};


const MyAgenda: any = (props: Props) => {

	let userId: string = useReactiveVar(userIdVar);
	let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);

	const [faveSessions, setFaveSessions]: any = useState([]);
	const [favePresenters, setFavePresenters]: any = useState([]);
	const [eventDates, setEventDates]: any = useState([]);

	const [eventInfo, setEventInfo]: any = useState({
		id: eventId,
		event_name: '',
		event_logo: '',
		event_desc: '',
		start_date: '',
		end_date: '',
		timezone_abbr: '',
		primary_domain: '',
		address: '',
		city: '',
		county: '',
		country: ''
	});

	const getEventData: any = async () => {
		const result: any = await API.graphql(graphqlOperation( getEvent, {id: eventId} ));

		try{
			const row: any = result.data.getEvent;
			setEventInfo({
				id: row.id,
				event_name: row.event_name,
				event_logo: row.event_logo,
				event_desc: row.event_desc,
				start_date: row.start_date,
				end_date: row.end_date,
				timezone_abbr: row.timezone_abbr,
				primary_domain: row.primary_domain,
				address: row.address,
				city: row.city,
				county: row.county,
				country: row.country
			});

			/* start: parse event dates */
			if( row.start_date && row.end_date ){
				const sd: any = moment(row.start_date);
				const ed: any = moment(row.end_date);

				let days: number = Math.ceil(ed.diff(sd, 'days', true));

				const tmpDays: string[] = [];

				for( let idx: number = 0; idx < days; idx++ ){
					const sd_clone: any = sd.clone();
					let add2Clone: string = sd_clone.add(idx, 'days');	//.format('DD/MM/YYYY');
					//console.log('add2Clone:', add2Clone);
					tmpDays.push(add2Clone);
				}

				//console.log('tmpDays:', tmpDays);

				if( tmpDays.length ){ setEventDates(tmpDays); }

			}
			/* end: parse event dates */
		}catch( err: any ){}
	};

	const getFavourites: any = async () => {
		const params: any = {
			filter: {
				cognito_sub: {eq: userId},
				client_id: {eq: clientId},
				event_id: {eq: eventId}
				/*session_id: null,
				presenter_id: null*/
			}
		};

		const result: any = await API.graphql(graphqlOperation( listFavourites, params ));
		//console.log('items:', result.data.listFavourites.items);

		const tmpSessionIds: string[] = [];
		const tmpPresenterIds: string[] = [];

		result.data.listFavourites.items.map((row: any) => {
			if( row.session_id && tmpSessionIds.indexOf(row.session_id) == -1 ){
				tmpSessionIds.push(row.session_id);
			}
			if( row.presenter_id && tmpPresenterIds.indexOf(row.presenter_id) == -1 ){
				tmpPresenterIds.push(row.presenter_id);
			}
		});

		if( tmpSessionIds.length ){
			//setSessionIds(tmpSessionIds);
			getSessionData(tmpSessionIds);
		}
		if( tmpPresenterIds.length ){
			//setPresenterIds(tmpPresenterIds);
			getPresenterData(tmpPresenterIds);
		}
	};

	const getSessionData: any = async (arr: string[]) => {
		const tmpSess: any[] = [];

		for( let idx: number = 0; idx < arr.length; idx++ ){
			const result: any = await API.graphql(graphqlOperation( getSession, {id: arr[idx]} ));
			//console.log('getSessionData:', result);
			tmpSess.push(result.data.getSession);
		}

		if( tmpSess.length ){ setFaveSessions(tmpSess); }
	};

	const getPresenterData: any = async (arr: string[]) => {
		const tmpPres: any[] = [];

		for( let idx: number = 0; idx < arr.length; idx++ ){
			const result: any = await API.graphql(graphqlOperation( getPresenter, {id: arr[idx]} ));

			const row: any = (result.data.getPresenter || {});

			const presObj: any = {
				id: row.id,
				company: row.company,
				createdAt: row.createdAt,
				email: row.email,
				first_name: row.first_name,
				last_name: row.last_name,
				profile_img: row.profile_img,
				session_id: row.session_id,
				social_medias: row.social_medias,
				title: row.title,
				updatedAt: row.updatedAt
			};

			//console.log('getPresenterData:', result);
			try{
				if( presObj.profile_img ){
					const getS3Obj: any = await getStorage(presObj.profile_img);
					//console.log('getS3Obj:', getS3Obj);
					if( getS3Obj.success ){ presObj.profile_img = getS3Obj.data; }
				}
			}catch( err: any ){}

			//console.log('presObj:', presObj);
			tmpPres.push(presObj);
		}

		if( tmpPres.length ){ setFavePresenters(tmpPres); }
	};

	useEffect(() => {
		getEventData();
		getFavourites();
	}, []);

	return(
		<div>

			{/* console.log('eventInfo:', eventInfo) */}
			{/* console.log('eventDates', eventDates) */}
			{/* console.log('faveSessions:', faveSessions) */}
			{/* console.log('favePresenters:', favePresenters) */}

			<CmsBreadcrumb section="Event" page="My Agenda" />

			<Event eventObj={eventInfo}
				eventDatesArr={eventDates}
				faveSessions={faveSessions} />

		</div>
	);

};


export default MyAgenda;