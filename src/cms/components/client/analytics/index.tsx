import { API, graphqlOperation } from 'aws-amplify';
import { useReactiveVar } from '@apollo/client';
import CmsBreadcrumb from '../../../../utils/cmsBreadcrumb';
import CmsHeader from '../../../../utils/cmsHeader';
import { clientIdVar, userIdVar, eventIdVar } from '../../../../stores/cache';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useEffect, useState, createRef } from 'react';
import {
	listEvents,
	listSessions,
	listPresenters,
	listPresenterSocialMedias,
	listTables,
	listUserEventJoins
} from '../../../../graphql/queries';
import { createLink } from '../../../../utils/createLink';
import { adminGetUser } from '../../../../utils/cognitoService';
import { Doughnut, Line } from 'react-chartjs-2';
import { sortEventsByDate } from '../../../../utils/sortEvents';
import moment from 'moment';


interface Props {};


const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		width: '22rem',
		minHeight: '200px',
		//height: '200px',
		//minWidth: '350px',
		maxWidth: '350px'
	},
	chartDiv: {
		position: 'relative',
		margin: 'auto',
		width: '100%',
		height: '50vh'
	}
	/*media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: 'red[500]'
	}*/
}));


const Analytics = (props: Props) => {

	//let userId: string = useReactiveVar(userIdVar);
	let clientId: string = useReactiveVar(clientIdVar);
	//let eventId: string = useReactiveVar(eventIdVar);
	const classes: any = useStyles();
	const lineRef: any = createRef();
	const doughnutRef: any = createRef();

	const [eventCount, setEventCount]: any = useState(0);
	const [userCount, setUserCount]: any = useState(0);
	const [sessionCount, setSessionCount]: any = useState(0);
	const [presenterCount, setPresenterCount]: any = useState(0);
	const [socialMediaCount, setSocialMediaCount]: any = useState(0);
	const [tableCount, setTableCount]: any = useState(0);
	const [tableCapacityCount, setTableCapacityCount]: any = useState(0);
	const [hallCount, setHallCount]: any = useState(0);
	const [stageCount, setStageCount]: any = useState(0);
	const [totalActive, setTotalActive]: any = useState(0);
	const [totalArchived, setTotalArchived]: any = useState(0);
	const [xAxis, setXAxis]: any = useState([]);
	const [yAxis, setYAxis]: any = useState([]);

	const doughnutData: any = {
		datasets: [{
			label: 'Event Totals',
			data: [ totalActive, totalArchived ],
			backgroundColor: [ 'rgb(255, 99, 132)', 'rgb(54, 162, 235)' ],
			hoverOffset: 0
		}],
		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: [
			'Active Events',
			'Archived Events'
		]
	};

	const lineData: any = {
		datasets: [{
			label: 'Event Timeline',
			data: yAxis,
			borderColor: 'rgb(75, 192, 192)',
			fill: true,
			tension: 0.3,
			pointRadius: 5
		}],
		labels: xAxis
	};

	const createAxes: any = (events: any[]) => {
		let dtFormat: string = 'MMM `YY';

		//console.log('events[last]:', events[events.length - 1]);
		//console.log('moment(events[0]:', moment(events[0].start_date));

		/* start: create date x axis */
		let first: any = moment(new Date()).add(-6, 'months');	// set default
		if( events[0].start_date ){
			first = moment(events[0].start_date);
		}
		let last: any = moment(new Date()).add(6, 'months');	// set default
		if( events[events.length - 1].start_date ){
			last = moment(events[events.length - 1].start_date);
		}
		let monthDiff: number = last.diff(first, 'months');
		const xArr: any[] = [first.format(dtFormat)];

		//console.log('first:', first);
		//console.log('last:', last);
		//console.log('monthDiff:', monthDiff);
		//console.log('xArr:', xArr);

		for( let idx: number = 1; idx < monthDiff; idx++ ){
			let nextMonth: any = moment(first).add(idx, 'months');
			xArr.push(nextMonth.format(dtFormat));
		}

		xArr.push(last.format(dtFormat));
		if( xArr.length ){ setXAxis(xArr); }
		//console.log('xArr:', xArr);
		/* end: create date x axis */


		/* start: create count y axis */
		const yArr: any[] = [];
		xArr.map(() => yArr.push(0));	// set y axis defaults
		events.map((evt: any) => {
			//console.log('evt:', evt);
			if( evt.start_date ){
				let xAxisIdx: any = xArr.indexOf(moment(evt.start_date).format(dtFormat));
				if( xAxisIdx > -1 ){
					yArr[xAxisIdx]++;
				}
			}
		});

		if( yArr.length ){ setYAxis(yArr); }
		/* end: create count y axis */

	};

	const getActive: any = (events: any[]) => {
		const arr: any[] = events.filter((evt: any) => {
			return( !evt.archived );
		});
		if( arr.length ){ setTotalActive(arr.length); }
	};

	const getArchived: any = (events: any[]) => {
		const arr: any[] = events.filter((evt: any) => {
			return( evt.archived );
		});
		if( arr.length ){ setTotalArchived(arr.length); }
	};

	const getEvents: any = async () => {
		const params: any = {
			filter: {
				client_id: {eq: clientId}
			}
		};
		const result: any = await API.graphql(graphqlOperation( listEvents, params ));
		const events: any[] = (result.data.listEvents.items || []);
		//console.log('events:', events);

		if( events.length ){ setEventCount(events.length); }
		const sorted: any[] = sortEventsByDate(events);
		createAxes(sorted);
		getActive(events);
		getArchived(events);

		return events;
	};

	const getSessions: any = async (events: any[]) => {
		let session_count: number = 0;
		let hall_count: number = 0;
		let stage_count: number = 0;
		const sessionArr: any[] = [];

		for( let idx: number = 0; idx < events.length; idx++ ){
			const row: any = events[idx];
			const params: any = {
				filter: {event_id: {eq: row.id}}
			};
			const result: any = await API.graphql(graphqlOperation( listSessions, params ));
			const sessions: any[] = (result.data.listSessions.items || []);
			session_count += sessions.length;

			sessions.map((row: any) => {
				//console.log('sess:', row);
				if( row.hall ){ hall_count++; }
				const stages: any[] = (row.stages.items || []);
				stage_count += stages.length;
				sessionArr.push(row);
			});
		}

		if( session_count ){ setSessionCount(session_count); }
		if( hall_count ){ setHallCount(hall_count); }
		if( stage_count ){ setStageCount(stage_count); }

		return sessionArr;
	};

	const getPresenters: any = async (sessions: any[]) => {
		let count: number = 0;
		const presenterArr: any[] = [];

		for( let idx: number = 0; idx < sessions.length; idx++ ){
			const sess: any = sessions[idx];
			const params: any = {
				filter: {session_id: {eq: sess.id}}
			};
			const result: any = await API.graphql(graphqlOperation( listPresenters, params ));
			const presenters: any[] = (result.data.listPresenters.items || []);

			count += presenters.length;
			presenters.map((pres: any) => { presenterArr.push(pres); });
		}

		if( count ){ setPresenterCount(count); }
		return presenterArr;
	};

	const getSocialMedias: any = async (presenters: any[]) => {
		let count: number = 0;
		const medias: any[] = [];

		for( let idx: number = 0; idx < presenters.length; idx++ ){
			const row: any = presenters[idx];

			const params: any = {
				filter: {presenter_id: {eq: row.id}}
			};
			const result: any = await API.graphql(graphqlOperation( listPresenterSocialMedias, params ));
			const records: any = (result.data.listPresenterSocialMedias.items || []);
			//console.log('records:', records);

			records.map((row: any) => {
				if( row.link && createLink(row.link) ){
					count++;
					medias.push(row);
				}
			});
		}

		//console.log('count:', count);
		//console.log('medias:', medias);

		if( count ){ setSocialMediaCount(count); }
		return medias;
	};

	const getTables: any = async (events: any[]) => {
		let tables_count: number = 0;
		let capacity_count: number = 0;
		const tableArr: any[] = [];

		for( let idx: number = 0; idx < events.length; idx++ ){
			const evt: any = events[idx];

			const params: any = {
				filter: {event_id: {eq: evt.id}}
			};
			const result: any = await API.graphql(graphqlOperation( listTables, params ));
			const tables: any[] = (result.data.listTables.items || []);

			tables.map((tbl: any) => {
				//console.log('tbl:', tbl);
				tables_count++;
				capacity_count += tbl.capacity;
				tableArr.push(tbl);
			});
		}

		//console.log('tables_count:', tables_count);
		//console.log('capacity_count:', capacity_count);

		if( tables_count ){ setTableCount(tables_count); }
		if( capacity_count ){ setTableCapacityCount(capacity_count); }
		return tableArr;
	};

	const getUserEvtJoins: any = async () => {
		let sub_count: number = 0;
		const tmpSubs: string[] = [];

		const params: any = {
			filter: {
				//cognito_sub: {eq: userId},
				client_id: {eq: clientId}
			}
		};
		const result: any = await API.graphql(graphqlOperation( listUserEventJoins, params ));
		const joins: any[] = (result.data.listUserEventJoins.items || []);

		//console.log('listUserEventJoins:', joins);

		for( let idx: number = 0; idx < joins.length; idx++ ){
			const row: any = joins[idx];
			if( tmpSubs.indexOf(row.cognito_sub) == -1 ){
				tmpSubs.push(row.cognito_sub);
				try{
					const cogUser: any = await adminGetUser(row.cognito_sub);
					if( cogUser ){ sub_count++; }
				}catch( err: any ){}
			}
		}

		//console.log('sub_count:', sub_count);
		//console.log('tmpSubs:', tmpSubs);

		if( sub_count ){ setUserCount(sub_count); }
	};

	const doAsyncs: any = async () => {
		const events: any[] = await getEvents();
		const sessions: any[] = await getSessions(events);
		const presenters: any[] = await getPresenters(sessions);
		getSocialMedias(presenters);
		getTables(events);
	};

	useEffect(() => {
		doAsyncs();
		getUserEvtJoins();
	}, []);

	return (
		<div>

			<CmsBreadcrumb section="Analytics" page="View" />
			<CmsHeader showEventInfo="false" />
			<br />
			Events: {eventCount}<br />
			<hr />
			Users: {userCount}<br />
			<hr />
			Sessions: {sessionCount}<br />
			&raquo; Halls: {hallCount}<br />
			&raquo; Stages: {stageCount}<br />
			&raquo; Presenters: {presenterCount}<br />
			&raquo; &raquo; Social media links: {socialMediaCount}<br />
			<hr />
			Tables: {tableCount}<br />
			&raquo; Table capacity: {tableCapacityCount}

			<br /><br /><br />

			<div className={classes.chartDiv}>
				<Line ref={lineRef}
					type="line"
					options={{ maintainAspectRatio: false, responsive: true }}
					data={lineData} />
			</div>

			<br />

			<div className={classes.chartDiv}>
				<Doughnut ref={doughnutRef}
					type="doughnut"
					options={{ maintainAspectRatio: false, responsive: true }}
					data={doughnutData} />
			</div>

		</div>
	);

};


export default Analytics;