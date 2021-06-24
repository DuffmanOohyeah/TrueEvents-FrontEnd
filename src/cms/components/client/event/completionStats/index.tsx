import { API, graphqlOperation } from 'aws-amplify';
import { useReactiveVar } from '@apollo/client';
import { useEffect, useState, createRef } from 'react';
import { clientIdVar, eventIdVar, eventNameVar } from '../../../../../stores/cache';
import {
	getEvent,
	listSessions,
	listPresenters,
	listTables,
	listStages,
	listUserEventJoins,
	listWebinars
} from '../../../../../graphql/queries';
import { List, ListItem } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


interface Props {};

const useStyles: any = makeStyles((theme: Theme) => createStyles({
	/*root: {
		width: '22rem',
		minHeight: '200px',
		//height: '200px',
		//minWidth: '350px',
		maxWidth: '350px'
	},*/
	chartDiv: {
		position: 'relative',
		margin: 'auto',
		width: '100%',
		height: '30vh'
	}
}));


const EventCompletionStats: any = (props: Props) => {

	let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);
	let eventName: string = useReactiveVar(eventNameVar);
	let sectionsDone: number = 0;
	let totalSections: number = 14;
	const classes: any = useStyles();
	const doughnutRef: any = createRef();

	const [sectionsCompleted, setSectionsCompleted]: any = useState(0);
	const [hasDetails, setHasDetails]: any = useState(false);
	const [hasSessions, setHasSessions]: any = useState(false);
	const [hasPresenters, setHasPresenters]: any = useState(false);
	const [hasTables, setHasTables]: any = useState(false);
	const [hasHalls, setHasHalls]: any = useState(false);
	const [hasWebinars, setHasWebinars]: any = useState(false);
	const [hasStages, setHasStages]: any = useState(false);
	const [hasTeam, setHasTeam]: any = useState(false);
	const [hasBranding, setHasBranding]: any = useState(false);
	const [hasBrandAreas, setHasBrandAreas]: any = useState(false);
	const [hasRegistration, setHasRegistrations]: any = useState(false);
	const [hasComms, setHasComms]: any = useState(false);
	const [hasLandingPage, setHasLandingPage]: any = useState(false);
	const [hasAgenda, setHasAgenda]: any = useState(false);

	const getPctComplete: any = () => {
		let rtnPct: string = '0.0';
		rtnPct = ((sectionsCompleted / totalSections) * 100).toFixed(1);
		return rtnPct;
	};

	const getPctIncomplete: any = () => {
		let rtnPct: string = '0.0';
		rtnPct = (((totalSections - sectionsCompleted) / totalSections) * 100).toFixed(1);
		return rtnPct;
	};

	const doughnutData: any = {
		datasets: [{
			label: 'Event Totals',
			data: [ getPctComplete(), getPctIncomplete() ],
			hoverOffset: 0,
			backgroundColor: [ 'rgb(255, 99, 132)', 'rgb(54, 162, 235)' ]
		}],
		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: [ '% Complete', '% Incomplete' ]
	};

	const getEvtDetails: any = async () => {
		const params: any = {
			id: eventId
		};

		const result: any = await API.graphql(graphqlOperation( getEvent, params ));
		//console.log('getEvent:', result.data.getEvent);
		const row: any = (result.data.getEvent || {});

		if( row.event_name && row.start_date && row.end_date ){
			setHasDetails(true);
			sectionsDone++;
			incrementSectionCounter(sectionsDone);
		}
	};

	const getEvtSessions: any = async () => {
		const params: any = {
			filter: {
				event_id: {eq: eventId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listSessions, params ));
		const sessions: any[] = (result.data.listSessions.items || []);
		//console.log('getEvtSessions:', sessions);

		if( sessions.length ){
			setHasSessions(true);
			sectionsDone++;
			incrementSectionCounter(sectionsDone);
		}

		/* start: get presenters */
		for( let idx: number = 0; idx < sessions.length; idx++ ){
			const session: any = sessions[idx];
			if( session.id ){
				let hasPres: boolean = await getEvtPresenters(session.id);
				if( hasPres ){ break; }
			}
		}
		/* end: get presenters */

		/* start: get stages */
		for( let idx: number = 0; idx < sessions.length; idx++ ){
			const session: any = sessions[idx];
			if( session.id ){
				let hasStage: boolean = await getEvtStages(session.id);
				if( hasStage ){ break; }
			}
		}
		/* end: get stages */

		/* start: get webinars */
		for( let idx: number = 0; idx < sessions.length; idx++ ){
			const session: any = sessions[idx];
			if( session.id ){
				let hasWebinar: boolean = await getEvtWebinars(session.id);
				if( hasWebinar ){ break; }
			}
		}
		/* end: get webinars */

		/* start: get halls */
		for( let idx: number = 0; idx < sessions.length; idx++ ){
			const session: any = sessions[idx];
			//console.log('session:', session);
			if( session.hall && session.hall.id ){
				setHasHalls(true);
				sectionsDone++;
				incrementSectionCounter(sectionsDone);
				break;
			}
		}
		/* end: get halls */

	};

	const getEvtPresenters: any = async (sessionId: string) => {
		let rtnBln: boolean = false;

		const params: any = {
			filter: {
				session_id: {eq: sessionId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listPresenters, params ));
		const rows: any = (result.data.listPresenters.items || []);
		//console.log('pres:', result);

		if( rows.length ){
			setHasPresenters(true);
			sectionsDone++;
			incrementSectionCounter(sectionsDone);
			rtnBln = true;
		}

		return rtnBln;
	};

	const getEvtStages: any = async (sessionId: string) => {
		let rtnBln: boolean = false;

		const params: any = {
			filter: {
				session_id: {eq: sessionId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listStages, params ));
		//console.log('getEvtStages:', result);

		const rows: any[] = (result.data.listStages.items || []);

		if( rows.length ){
			setHasStages(true);
			sectionsDone++;
			incrementSectionCounter(sectionsDone);
			rtnBln = true;
		}

		return rtnBln;
	};

	const getEvtWebinars: any = async (sessionId: string) => {
		let rtnBln: boolean = false;

		const params: any = {
			filter: {
				session_id: {eq: sessionId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listWebinars, params ));
		//console.log('getEvtWebinars:', result);

		const rows: any[] = (result.data.listWebinars.items || []);

		if( rows.length ){
			setHasWebinars(true);
			sectionsDone++;
			incrementSectionCounter(sectionsDone);
			rtnBln = true;
		}

		return rtnBln;
	};

	const getEvtTables: any = async () => {
		const params: any = {
			filter: {
				event_id: {eq: eventId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listTables, params ));
		//console.log('getEvtTables:', result);
		const rows: any[] = (result.data.listTables.items || []);

		if( rows.length ){
			setHasTables(true);
			sectionsDone++;
			incrementSectionCounter(sectionsDone);

		}
	};

	const getEvtTeam: any = async () => {
		const params: any = {
			filter: {
				client_id: {eq: clientId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listUserEventJoins, params ));
		//console.log('listUserEventJoins:', result);

		const joins: any[] = (result.data.listUserEventJoins.items || []);

		for( let idx: number = 0; idx < joins.length; idx++ ){
			const row: any = joins[idx];
			if( row.event && row.event.id == eventId ){
				setHasTeam(true);
				sectionsDone++;
				incrementSectionCounter(sectionsDone);
				break;
			}
		}

	};

	const incrementSectionCounter: any = (total: number) => {
		//console.log('total:', total);
		setSectionsCompleted( total );
	};

	useEffect(() => {
		getEvtDetails();
		getEvtSessions();
		getEvtTables();
		getEvtTeam();
	}, []);

	return(
		<div>
			<List>
				<ListItem>
					Setup {eventName} - Completion
				</ListItem>
				<div className={classes.chartDiv}>
					<Doughnut ref={doughnutRef}
						type="doughnut"
						options={{ maintainAspectRatio: false, responsive: true }}
						data={doughnutData} />
				</div>
				<ListItem divider>
					Sections Completed: {sectionsCompleted} of {totalSections}
				</ListItem>
				<ListItem divider>
					Event Details: {hasDetails.toString()}
				</ListItem>
				<ListItem divider>
					Event Sessions: {hasSessions.toString()}
				</ListItem>
				<ListItem divider>
					Event Presenters: {hasPresenters.toString()}
				</ListItem>
				<ListItem divider>
					Event Tables: {hasTables.toString()}
				</ListItem>
				<ListItem divider>
					Event Halls: {hasHalls.toString()}
				</ListItem>
				<ListItem divider>
					Event Stages: {hasStages.toString()}
				</ListItem>
				<ListItem divider>
					Event Webinars: {hasWebinars.toString()}
				</ListItem>
				<ListItem divider>
					Event Team: {hasTeam.toString()}
				</ListItem>
				<ListItem divider>
					Branding &amp; Design: {hasBranding.toString()}
				</ListItem>
				<ListItem divider>
					Brandable Areas: {hasBrandAreas.toString()}
				</ListItem>
				<ListItem divider>
					Registration: {hasRegistration.toString()}
				</ListItem>
				<ListItem divider>
					Emails &amp; Communication: {hasComms.toString()}
				</ListItem>
				<ListItem divider>
					Landing Page: {hasLandingPage.toString()}
				</ListItem>
				<ListItem>
					Agenda Builder: {hasAgenda.toString()}
				</ListItem>
			</List>
		</div>
	);

};


export default EventCompletionStats;