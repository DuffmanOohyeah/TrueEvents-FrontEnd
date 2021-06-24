import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { API, graphqlOperation } from 'aws-amplify';
import { eventIdVar } from '../../../../../stores/cache';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { listSessions, getWebinar } from '../../../../../graphql/queries';
import { updateWebinar } from '../../../../../graphql/mutations';
import history from '../../../../../utils/history';
import { Collapse, TextField, Button, MenuItem } from '@material-ui/core';
import { parseFormDate } from '../../../../../utils/parseFormDate';
import { sortSessionsByName } from '../../../../../utils/sortSessions';
import { sortWebinars, filterWebinars } from '../../../../../utils/webinars';
import ShowAttributeFields from './showAttributeFields';


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


const EditWebinar: any = (props: Props) => {

	let { id }: any = useParams();
	const classes: any = useStyles();
	let eventId: string = useReactiveVar(eventIdVar);

	const [hideDiv, setHideDiv]: any = useState(false);
	const [pageTitle, setPageTitle]: any = useState('Edit Webinar Details');
	const [showSubmit, setShowSubmit]: any = useState(true);
	const [sessions, setSessions]: any = useState([]);
	const [showTypeAttributes, setShowTypeAttributes]: any = useState(false);

	const [webinarInfo, setWebinarInfo]: any = useState({
		id: id,
		session_id: '',
		webinar_name: '',
		webinar_desc: '',
		webinar_type: '',
		webinar_api_key: '',
		webinar_url: '',
		updatedAt: '',
		createdAt: ''
	});

	const updateWebinarInfo: any = (key: string, value: string) => setWebinarInfo({...webinarInfo, [key]: value});

	const onSubmit: any = (evt: any) => {
		evt.preventDefault();
		let path: string = '/cms/client/event/webinars?action=';
		let action: string = 'error';
		try{
			saveWebinarData();
			action = 'created';
		}catch( err: any ){}
		history.push(path + action);
	};

	const onWebinarChange: any = (evt: any) => {
		evt.preventDefault();
		let name: string = evt.target.name;
		let value: any = evt.target.value;
		updateWebinarInfo(name, value);
		//console.log(`${name}: ${value}`);

		switch( name ){
			case 'webinar_name':
				if( value && webinarInfo.session_id ){ setShowSubmit(true); }
				else{ setShowSubmit(false); }
			break;
			case 'session_id':
				if( value && webinarInfo.webinar_name ){ setShowSubmit(true); }
				else{ setShowSubmit(false); }
			break;
			case 'webinar_type':
				if( value ){ setShowTypeAttributes(true); }
				else{
					setShowTypeAttributes(false);
					//updateWebinarInfo('webinar_api_key', '');
					//updateWebinarInfo('webinar_url', '');
				}
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

		if( tmpSess.length ){ setSessions(tmpSess); }
	};

	const getWebinarData: any = async () => {
		const params: any = {
			id: id
		};
		const result: any = await API.graphql(graphqlOperation( getWebinar, params ));
		//console.log('getWebinarData:', result);
		const row: any = (result.data.getWebinar || {});

		if( row.id ){
			setWebinarInfo({
				id: row.id,
				session_id: row.session_id,
				webinar_name: row.webinar_name,
				webinar_desc: row.webinar_desc,
				webinar_type: row.webinar_type,
				webinar_api_key: row.webinar_api_key,
				webinar_url: row.webinar_url,
				updatedAt: row.updatedAt,
				createdAt: row.createdAt
			});
			if( row.webinar_type ){ setShowTypeAttributes(true); }
		}
	};

	const saveWebinarData: any = () => {
		const params: any = {
			input: {
				id: webinarInfo.id,
				session_id: webinarInfo.session_id,
				webinar_name: webinarInfo.webinar_name,
				webinar_desc: webinarInfo.webinar_desc,
				webinar_type: webinarInfo.webinar_type,
				webinar_api_key: (webinarInfo.webinar_type ? webinarInfo.webinar_api_key : null),
				webinar_url: (webinarInfo.webinar_type ? webinarInfo.webinar_url : null)
			}
		};
		API.graphql(graphqlOperation( updateWebinar, params ));
	};

	useEffect(() => {
		getWebinarData();
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

							<TextField name="webinar_name"
								label="Webinar Name:"
								required
								value={webinarInfo.webinar_name}
								onChange={onWebinarChange} />

							<TextField name="webinar_desc"
								label="Description:"
								value={webinarInfo.webinar_desc}
								onChange={onWebinarChange} />

							<TextField name="session_id"
									label="Session:"
									required
									value={webinarInfo.session_id}
									onChange={onWebinarChange}
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

							<TextField name="webinar_type"
									label="Type:"
									value={webinarInfo.webinar_type}
									onChange={onWebinarChange}
									select>
								<MenuItem value="">
									<i>- Select -</i>
								</MenuItem>
								{sortWebinars().map((row: any, idx: number) => {
									return(
										<MenuItem key={idx} value={row.type}>
											{row.type}
										</MenuItem>
									);
								})}
							</TextField>

							{showTypeAttributes
								? (
									<ShowAttributeFields stateObj={webinarInfo}
										webinarArr={filterWebinars(webinarInfo.webinar_type)}
										onChange={onWebinarChange} />
								)
								: null
							}

							{props.userGroups.indexOf('WebinarAdmin') > -1
								? (
									<>
										<TextField name="createdAt"
											label="Created Date:"
											value={parseFormDate(webinarInfo.createdAt)}
											disabled />
										<TextField name="updatedAt"
											label="Updated Date:"
											value={parseFormDate(webinarInfo.updatedAt)}
											disabled />

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


export default EditWebinar;