import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { API, graphqlOperation } from 'aws-amplify';
//import { parseFormDate } from '../../../../../utils/parseFormDate';
import history from '../../../../../utils/history';
import { updateSession, createHall } from '../../../../../graphql/mutations';
import { listSessions } from '../../../../../graphql/queries';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { eventIdVar } from '../../../../../stores/cache';
import { Collapse, TextField, Button, MenuItem } from '@material-ui/core';
import { sortSessionsByName } from '../../../../../utils/sortSessions';


interface Props {};

const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		'& > *': {
			width: '35ch',
			margin: theme.spacing(1)
		}
	},
	select: {
		width: '50%'
	},
	input: {
		display: 'none'
	},
	submit: {
		margin: 'auto',
		//border: '1px solid blue',
		//width: '100%'
		textAlign: 'center',
		float: 'right'
	}
}));


const AddHall: any = (props: Props) => {

	let { id }: any = useParams();
	//let userId: string = useReactiveVar(userIdVar);
	//let clientId: string = useReactiveVar(clientIdVar);
	//let clientFullName: string = useReactiveVar(clientFullNameVar);
	let eventId: string = useReactiveVar(eventIdVar);
	//let eventName: string = useReactiveVar(eventNameVar);
	const classes: any = useStyles();

	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [pageTitle, setPageTitle]: any = useState('Add Hall Details');
	const [showSubmit, setShowSubmit]: any = useState(false);
	const [sessions, setSessions]: any = useState([]);

	const [hallInfo, setHallInfo]: any = useState({
		hall_name: '',
		hall_desc: '',
		createdAt: '',
		updatedAt: '',
		sessionId: ''
	});

	const onSubmit: any = async (evt: any) => {
		evt.preventDefault();
		let path: string = '/cms/client/event/halls?action=';
		let action: string = 'error';
		try{
			let hallId: string = await saveHallData();
			saveSession(hallId);
			action = 'created';
		}catch( err: any ){}
		history.push(path + action);
	};

	const saveSession: any = (hallId: string) => {
		if( hallInfo.sessionId ){
			const params: any = {
				input: {
					id: hallInfo.sessionId,
					event_id: eventId,
					sessionHallId: (hallId || null)
				}
			};
			//console.log('saveSession:', params);
			API.graphql(graphqlOperation( updateSession, params ));
		}
	};

	const updateHallInfo: any = (key: string, value: string) => setHallInfo({...hallInfo, [key]: value});

	const onHallChange: any = (evt: any) => {
		evt.preventDefault();
		let name: string = evt.target.name;
		let value: any = evt.target.value;
		updateHallInfo(name, value);

		switch( name ){
			case 'hall_name':
				if( value /*&& hallInfo.sessionId*/ ){ setShowSubmit(true); }
				else{ setShowSubmit(false); }
			break;
			/*case 'sessionId':
				if( value && hallInfo.hall_name ){ setShowSubmit(true); }
				else{ setShowSubmit(false); }
			break;*/
		}
	};

	const saveHallData: any = async () => {
		const params: any = {
			input: {
				hall_name: hallInfo.hall_name,
				hall_desc: hallInfo.hall_desc
			}
		};
		const result: any = await API.graphql(graphqlOperation( createHall, params ));
		//console.log('saveHallData:', result);
		let hallId: string = (result.data.createHall.id || '');
		return hallId;
	};

	const getEvtSessions: any = async () => {
		const params: any = {
			filter: {event_id: {eq: eventId}}
		};
		const result: any = await API.graphql(graphqlOperation( listSessions, params ));
		//console.log('getEvtSessions:', result);

		const tmpSess: any[] = [];

		result.data.listSessions.items.map((row: any) => {
			if( !row.hall ){
				tmpSess.push({
					id: row.id,
					session_name: row.session_name
				});
			}
		});

		//console.log('tmpSess:', tmpSess);
		setSessions(tmpSess);
	};

	useEffect(() => {
		getEvtSessions();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				{pageTitle}
			</div>

			<Collapse in={true}>
				{hideDiv
					? null
					: (
						<form className={classes.root}>

							<TextField name="hall_name"
								label="Hall Name:"
								value={hallInfo.hall_name}
								onChange={onHallChange} required />

							<TextField name="hall_desc"
								label="Description:"
								value={hallInfo.hall_desc}
								onChange={onHallChange} />

							<TextField name="sessionId"
									label="Session:"
									value={hallInfo.sessionId}
									//required
									onChange={onHallChange}
									select>
								<MenuItem value="" disabled>
									<i>- Select -</i>
								</MenuItem>
								{sortSessionsByName(sessions).map((row: any, idx: number) => {
									return(
										<MenuItem key={idx} value={row.id}>
											{row.session_name}
										</MenuItem>
									);
								})}
							</TextField>

							{showSubmit
								? (
									<div className={classes.submit}>
										<br /><br />
										<Button variant="contained"
												color="primary"
												onClick={onSubmit}>
											{pageTitle}
										</Button>
									</div>
								)
								: null
							}

						</form>
					)
				}
			</Collapse>

		</div>
	);
};


export default AddHall;