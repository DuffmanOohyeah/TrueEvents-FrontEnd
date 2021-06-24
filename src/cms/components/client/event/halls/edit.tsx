import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { API, graphqlOperation } from 'aws-amplify';
import { eventIdVar } from '../../../../../stores/cache';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { listSessions } from '../../../../../graphql/queries';
import { updateHall, updateSession } from '../../../../../graphql/mutations';
import history from '../../../../../utils/history';
import { Collapse, TextField, Button, MenuItem } from '@material-ui/core';
import { parseFormDate } from '../../../../../utils/parseFormDate';
import { sortSessionsByName } from '../../../../../utils/sortSessions';


interface Props {
	userGroups: string[];
};


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


const EditHall: any = (props: Props) => {

	let { id }: any = useParams();
	const classes: any = useStyles();
	let eventId: string = useReactiveVar(eventIdVar);

	const [hideDiv, setHideDiv]: any = useState(false);
	const [pageTitle, setPageTitle]: any = useState('Edit Hall Details');
	const [showSubmit, setShowSubmit]: any = useState(true);
	const [sessions, setSessions]: any = useState([]);
	const [origSessionId, setOrigSessionId]: any = useState('');

	const [hallInfo, setHallInfo]: any = useState({
		id: id,
		hall_name: '',
		hall_desc: '',
		createdAt: '',
		updatedAt: '',
		sessionId: ''
	});

	const updateHallInfo: any = (key: string, value: string) => setHallInfo({...hallInfo, [key]: value});

	const onSubmit: any = (evt: any) => {
		evt.preventDefault();
		let path: string = '/cms/client/event/halls?action=';
		let action: string = 'error';
		try{
			saveHallData();
			saveSessionData();
			action = 'updated';
		}catch( err: any ){}
		history.push(path + action);
	};

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

	const getEvtSessions: any = async () => {
		const params: any = {
			filter: {event_id: {eq: eventId}}
		};
		const result: any = await API.graphql(graphqlOperation( listSessions, params ));
		//console.log('getEvtSessions:', result);

		const tmpSess: any[] = [];

		result.data.listSessions.items.map((row: any) => {
			if( !row.hall ){	// populate the session arr (without halls)
				tmpSess.push({
					id: row.id,
					session_name: row.session_name
				});
			}

			if( row.hall && row.hall.id == id ){
				setOrigSessionId(row.id);	//set incoming session id (to compare upon save)

				tmpSess.push({	// add the associated session
					id: row.id,
					session_name: row.session_name
				});

				setHallInfo({
					id: row.hall.id,
					hall_name: row.hall.hall_name,
					hall_desc: row.hall.hall_desc,
					createdAt: row.hall.createdAt,
					updatedAt: row.hall.updatedAt,
					sessionId: row.id	// does not belong to hall obj
				});
			}
		});

		setSessions(tmpSess);
	};

	const saveHallData: any = () => {
		const params: any = {
			input: {
				id: hallInfo.id,
				hall_name: hallInfo.hall_name,
				hall_desc: hallInfo.hall_desc
			}
		};

		API.graphql(graphqlOperation( updateHall, params ));
	};

	const saveSessionData: any = () => {
		if( hallInfo.sessionId ){
			const params: any = {
				input: {
					id: hallInfo.sessionId,
					event_id: eventId,
					sessionHallId: (hallInfo.id || null)
				}
			};

			API.graphql(graphqlOperation( updateSession, params ));
		}

		if( origSessionId && (origSessionId !== hallInfo.sessionId) ){	// if session changed, remove hall association
			const origParams: any = {
				input: {
					id: origSessionId,
					event_id: eventId,
					sessionHallId: null
				}
			};

			API.graphql(graphqlOperation( updateSession, origParams ));
		}
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
									onChange={onHallChange}
									//required
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

							{props.userGroups.indexOf('HallAdmin') > -1
								? (
									<><br />
										<TextField label="Created Date:" value={parseFormDate(hallInfo.createdAt)} disabled />
										<TextField label="Updated Date:" value={parseFormDate(hallInfo.updatedAt)} disabled />
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
									</>
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


export default EditHall;