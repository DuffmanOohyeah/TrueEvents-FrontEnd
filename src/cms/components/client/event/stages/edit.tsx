import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { API, graphqlOperation } from 'aws-amplify';
import { eventIdVar } from '../../../../../stores/cache';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { listSessions, listStages } from '../../../../../graphql/queries';
import { updateStage } from '../../../../../graphql/mutations';
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


const EditStage: any = (props: Props) => {

	let { id }: any = useParams();
	const classes: any = useStyles();
	let eventId: string = useReactiveVar(eventIdVar);

	const [hideDiv, setHideDiv]: any = useState(false);
	const [pageTitle, setPageTitle]: any = useState('Edit Stage Details');
	const [showSubmit, setShowSubmit]: any = useState(true);
	const [sessions, setSessions]: any = useState([]);

	const [stageInfo, setStageInfo]: any = useState({
		id: id,
		stage_name: '',
		stage_desc: '',
		createdAt: '',
		updatedAt: '',
		sessionId: ''
	});

	const updateStageInfo: any = (key: string, value: string) => setStageInfo({...stageInfo, [key]: value});

	const onSubmit: any = (evt: any) => {
		evt.preventDefault();
		let path: string = '/cms/client/event/stages?action=';
		let action: string = 'error';
		try{
			saveStageData();
			action = 'updated';
		}catch( err: any ){}
		history.push(path + action);
	};

	const onStageChange: any = (evt: any) => {
		evt.preventDefault();
		let name: string = evt.target.name;
		let value: any = evt.target.value.trim();
		updateStageInfo(name, value);

		switch( name ){
			case 'stage_name':
				if( value ){ setShowSubmit(true); }
				else{ setShowSubmit(false); }
			break;
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
			tmpSess.push({
				id: row.id,
				session_name: row.session_name
			});
		});

		if( tmpSess.length ){
			setSessions(tmpSess);
		}
	};

	const saveStageData: any = () => {
		const params: any = {
			input: {
				id: stageInfo.id,
				session_id: stageInfo.sessionId,
				stage_name: stageInfo.stage_name,
				stage_desc: stageInfo.stage_desc
			}
		};

		API.graphql(graphqlOperation( updateStage, params ));
	};

	const getStageData: any = async () => {
		const params: any = {
			filter: {id: {eq: id}}
		};

		const result: any = await API.graphql(graphqlOperation( listStages, params ));
		//console.log('result:', result);

		result.data.listStages.items.map((stage: any) => {
			if( stage.id == id ){
				setStageInfo({
					id: stage.id,
					stage_name: stage.stage_name,
					stage_desc: stage.stage_desc,
					createdAt: stage.createdAt,
					updatedAt: stage.updatedAt,
					sessionId: stage.session_id
				});
			}
		});
	};

	useEffect(() => {
		getEvtSessions();
		getStageData();
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

							<TextField name="stage_name"
								label="Stage Name:"
								required
								value={stageInfo.stage_name}
								onChange={onStageChange} />

							<TextField name="stage_desc"
								label="Description:"
								value={stageInfo.stage_desc}
								onChange={onStageChange} />

							<TextField name="sessionId"
									label="Session:"
									value={stageInfo.sessionId}
									onChange={onStageChange}
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

							{props.userGroups.indexOf('StageAdmin') > -1
								? (
									<><br />
										<TextField label="Created Date:" value={parseFormDate(stageInfo.createdAt)} disabled />
										<TextField label="Updated Date:" value={parseFormDate(stageInfo.updatedAt)} disabled />
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


export default EditStage;