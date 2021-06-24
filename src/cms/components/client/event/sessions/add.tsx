import { API, graphqlOperation } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { parseFormDate } from '../../../../../utils/parseFormDate';
import history from '../../../../../utils/history';
import { getEvent } from '../../../../../graphql/queries';
import { createSession } from '../../../../../graphql/mutations';
import { eventIdVar } from '../../../../../stores/cache';
import { Collapse, TextField, Button } from '@material-ui/core';


interface Props {};

let dtFormatWithTime: string = 'YYYY-MM-DDTHH:mm';


const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		'& > *': {
			width: '35ch',
			margin: theme.spacing(1)
		}
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


const AddSession: any = (props: Props) => {

	let { id }: any = useParams();
	let eventId: string = useReactiveVar(eventIdVar);
	const [hideDiv, setHideDiv]: any = useState(id ? true : false);
	const [showSubmit, setShowSubmit]: any = useState(false);
	const [pageTitle, setPageTitle]: any = useState('Add Session Details');
	const [startDateCopy, setStartDateCopy]: any = useState('');
	const [endDateCopy, setEndDateCopy]: any = useState('');
	const classes: any = useStyles();

	const [sessionInfo, setSessionInfo]: any = useState({
		id: id,
		event_id: eventId,
		session_name: '',
		session_desc: '',
		start_date: '',
		end_date: '',
		createdAt: '',
		updatedAt: ''
	});

	const updateSessionInfo: any = (key: string, value: string) => setSessionInfo({...sessionInfo, [key]: value});

	const onSessionChange: any = (evt: any) => {
		evt.preventDefault();
		let name: string = evt.target.name;
		let value: any = evt.target.value;

		updateSessionInfo(name, value);

		switch( name ){
			case 'session_name':
				if( value.trim() ){
					setShowSubmit(true);
				}else{
					setShowSubmit(false);
				}
			break;
		}
	};

	const onSubmit: any = (evt: any) => {
		evt.preventDefault();
		try{
			saveSessionData();
			history.push('/cms/client/event/sessions?action=created');
		}catch( err: any ){
			history.push('/cms/client/event/sessions?action=error');
		}
	};

	const saveSessionData: any = () => {

		/* start: set dates if incomplete */
		let inpStartDt: string = sessionInfo.start_date;
		let inpEndDt: string = sessionInfo.end_date;

		if( !inpStartDt && startDateCopy ){ inpStartDt = startDateCopy; }
		if( !inpEndDt && endDateCopy ){ inpEndDt = endDateCopy; }
		/* end: set dates if incomplete */

		const params: any = {
			input: {
				event_id: sessionInfo.event_id,
				session_name: sessionInfo.session_name,
				session_desc: sessionInfo.session_desc,
				start_date: (inpStartDt ? new Date(inpStartDt) : null),
				end_date: (inpEndDt ? new Date(inpEndDt) : null)
			}
		};

		//console.log('params:', params);

		API.graphql(graphqlOperation( createSession, params ));
	};

	const getEventInfo: any = async () => {
		const params: any = {
			id: eventId
		};
		const result: any = await API.graphql(graphqlOperation( getEvent, params ));
		//console.log('result:', result);
		const evt: any = (result.data.getEvent || {});
		if( evt.start_date ){
			updateSessionInfo('start_date', evt.start_date);
			setStartDateCopy(evt.start_date);
		}
		if( evt.end_date ){
			updateSessionInfo('end_date', evt.end_date);
			setEndDateCopy(evt.end_date);
		}
	};

	useEffect(() => {
		getEventInfo();
	}, []);

	return(
		<div><br />

			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				{pageTitle}
			</div>

			<Collapse in={true}>
				{hideDiv
					? null
					: (
						<form className={classes.root}>

							<TextField name="session_name"
								label="Session Name:"
								value={sessionInfo.session_name}
								onChange={onSessionChange} required />

							<TextField name="session_desc"
								label="Description:"
								value={sessionInfo.session_desc}
								onChange={onSessionChange} />

							<TextField name="start_date"
								label="Start Date/Time:"
								type="datetime-local"
								value={parseFormDate((sessionInfo.start_date || startDateCopy), dtFormatWithTime)}
								InputLabelProps={{ shrink: true }}
								inputProps={{
									min: parseFormDate(startDateCopy, dtFormatWithTime),
									max: parseFormDate(endDateCopy, dtFormatWithTime)
								}}
								onChange={onSessionChange} />

							<TextField name="end_date"
								label="End Date/Time:"
								type="datetime-local"
								value={parseFormDate((sessionInfo.end_date || endDateCopy), dtFormatWithTime)}
								InputLabelProps={{ shrink: true }}
								inputProps={{
									min: parseFormDate(startDateCopy, dtFormatWithTime),
									max: parseFormDate(endDateCopy , dtFormatWithTime)
								}}
								onChange={onSessionChange} />

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


export default AddSession;