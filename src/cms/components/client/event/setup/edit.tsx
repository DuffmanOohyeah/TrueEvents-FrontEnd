import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import history from '../../../../../utils/history';
import {
	Collapse,
	MenuItem,
	TextField,
	InputLabel,
	Button,
	TextareaAutosize
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { putStorage } from '../../../../../utils/awsStorage';
import ModalWindow from '../../../../../utils/imgModal';
import { getEvent, listUserEventJoins } from '../../../../../graphql/queries';
import { updateEvent } from '../../../../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { useReactiveVar } from '@apollo/client';
import { clientIdVar, userIdVar } from '../../../../../stores/cache';
import countries from '../../../../../utils/countryData';
import { parseFormDate } from '../../../../../utils/parseFormDate';
//import { eventGroups, filterEventByModule } from '../../../../../utils/eventGroupData';
import { timezones } from '../../../../../utils/timezoneData';
import FaveIcons from '../../../../../utils/showFavouriteIcons';


interface Props {
	userEvents: string[];
	userGroups: string[];
};


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


const EditEvent: any = (props: Props) => {

	let { id }: any = useParams();
	//let userId: string = useReactiveVar(userIdVar);
	let clientId: string = useReactiveVar(clientIdVar);

	const [hideDiv, setHideDiv]: any = useState(false);
	//const [userGroups, setUserGroups]: any = useState(['EventGuest']);
	const [pageTitle, setPageTitle]: any = useState('Edit Event Details');
	const [origImg, setOrigImg]: any = useState('');
	const [showSubmit, setShowSubmit]: any = useState(true);

	const [eventInfo, setEventInfo]: any = useState({
		id: id,
		client_id: clientId,
		event_name: '',
		event_logo: '',
		event_desc: '',
		start_date: '',
		end_date: '',
		timezone_abbr: '',
		primary_domain: '',
		other_domains: [],
		address: '',
		city: '',
		county: '',
		country: '',
		archived: false,
		archive_date: '',
		createdAt: '',
		updatedAt: ''
	});

	const classes: any = useStyles();

	const onEventChange: any = (evt: any) => {
		evt.preventDefault();
		let name: string = evt.target.name;
		let value: any = evt.target.value;

		//console.log('name:', name);
		//console.log('value:', value);

		switch( name ){
			case 'event_name':
				if( !value.length ){
					setShowSubmit(false);
				}else{
					setShowSubmit(true);
				}
			break;
			case 'other_domains':
				const tmpVals: string[] = [];

				value.split(',').map((val: string) => {
					val = val.trim();
					if( val.length ){
						tmpVals.push(val);
					}
				});

				value = tmpVals;	// make the value an array
				//console.log('tmpVals:', tmpVals);
			break;
		}

		updateEventInfo(name, value);
		//console.log('eventInfo:', eventInfo);
	};

	const updateEventInfo: any = (key: string, value: string) => setEventInfo({...eventInfo, [key]: value});

	const onSubmit: any = async (evt: any) => {
		evt.preventDefault();
		try{
			const imgName: string = await updateImg();
			saveEventData(imgName);
			history.push('/cms/client/event/setup/?action=updated');
		}catch( err: any ){
			history.push('/cms/client/event/setup/?action=error');
		}
	};

	const saveEventData: any = (imgName: string) => {
		imgName = (imgName || eventInfo.event_logo);

		const params: any = {
			input: {
				id: id,
				client_id: clientId,
				event_name: eventInfo.event_name,
				event_logo: imgName,
				event_desc: eventInfo.event_desc,
				start_date: (eventInfo.start_date ? new Date(eventInfo.start_date) : null),
				end_date: (eventInfo.end_date ? new Date(eventInfo.end_date) : null),
				timezone_abbr: eventInfo.timezone_abbr,
				primary_domain: eventInfo.primary_domain,
				other_domains: eventInfo.other_domains,	// should be array
				address: eventInfo.address,
				city: eventInfo.city,
				county: eventInfo.county,
				country: eventInfo.country,
				archived: eventInfo.archived,	// should be boolean
				archive_date: (eventInfo.archived == 'true' ? new Date() : null)
			}
		};

		//console.log('params:', params);

		API.graphql(graphqlOperation( updateEvent, params ));
	};

	const updateImg: any = async () => {
		let rtn: string = '';
		//console.log('updateImg:', userAtts.profile_img);
		if( eventInfo.event_logo && eventInfo.event_logo.name ){
			const s3Obj: any = await putStorage(eventInfo.event_logo, 'event', id);
			//console.log('s3Obj:', s3Obj);
			if( s3Obj.data.key ){
				let newLogoPath: string = s3Obj.data.key;
				updateEventInfo('event_logo', newLogoPath);
				rtn = newLogoPath;
			}
		}
		return rtn;
	};

	const changeImg: any = (evt: any) => {
		updateEventInfo(evt.target.name, evt.target.files[0]);	// key = string, value = obj
	};

	const getEventData: any = async () => {
		const result: any = await API.graphql(graphqlOperation( getEvent, {id: id} ));
		//console.log('result:', result);

		try{
			const row: any = result.data.getEvent;
			setEventInfo({
				id: row.id,
				client_id: row.client_id,
				event_name: row.event_name,
				event_logo: row.event_logo,
				event_desc: row.event_desc,
				start_date: row.start_date,
				end_date: row.end_date,
				timezone_abbr: row.timezone_abbr,
				primary_domain: row.primary_domain,
				other_domains: row.other_domains,	// eq array
				address: row.address,
				city: row.city,
				county: row.county,
				country: row.country,
				archived: row.archived,
				archive_date: row.archive_date,
				createdAt: row.createdAt,
				updatedAt: row.updatedAt
			});
			if( row.event_logo ){
				setOrigImg(row.event_logo);
			}
		}catch( err: any ){}
	};

	/*const setGroupsFromProps: any = () => {
		if( props.userGroups && props.userGroups.length ){
			//console.log('props:', props.userGroups);
			setUserGroups(props.userGroups);
			if( props.userGroups.indexOf('EventAdmin') > -1 ){
				setPageTitle('Edit Event');
				setShowSubmit(true);
			}
		}
	};*/

	useEffect(() => {
		getEventData();
		//setGroupsFromProps();
	}, []);

	return(
		<div>

			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				{pageTitle}
			</div>

			<Collapse in={true}>
				{hideDiv
					? null
					: (
						<>
							<form className={classes.root}>

								<TextField name="event_name" label="Event Name:" value={eventInfo.event_name} onChange={onEventChange} required />
								<TextField name="event_desc" label="Description:" value={eventInfo.event_desc} onChange={onEventChange} />

								<TextField name="start_date"
									label="Start Date/Time:"
									type="datetime-local"
									value={parseFormDate(eventInfo.start_date, dtFormatWithTime)}
									InputLabelProps={{ shrink: true }}
									onChange={onEventChange} />

								<TextField name="end_date"
									label="End Date/Time:"
									type="datetime-local"
									value={parseFormDate(eventInfo.end_date, dtFormatWithTime)}
									InputLabelProps={{ shrink: true }}
									onChange={onEventChange} />

								<div style={{ width: '85%' }}>
									<div style={{ float: 'left', width: '50%' }}>
										<TextField name="primary_domain" style={{ width: '100%' }} label="Primary Domain:" value={eventInfo.primary_domain} onChange={onEventChange} />
									</div>
									<div style={{ float: 'right', width: '47%' }}>
										<InputLabel>
											Other Domains:
											(comma delimited)
										</InputLabel>
										<TextareaAutosize name="other_domains"
											style={{ width: '100%' }}
											defaultValue={eventInfo.other_domains.join().replace(/,/g, ',\n')}
											onChange={onEventChange}
											rowsMin={2} />
									</div>
								</div>

								<TextField name="address" label="Address:" value={eventInfo.address} onChange={onEventChange} />
								<TextField name="city" label="City:" value={eventInfo.city} onChange={onEventChange} />
								<TextField name="county" label="County:" value={eventInfo.county} onChange={onEventChange} />

								<TextField name="country" label="Country:" value={eventInfo.country} onChange={onEventChange} select>
									{countries.map((row: any, idx: number) => (
										<MenuItem key={idx} value={row.country}>
											{row.country} ({row.iso_code})
										</MenuItem>
									))}
								</TextField>

								<TextField name="timezone_abbr" label="Time Zone:" value={eventInfo.timezone_abbr} onChange={onEventChange} select>
									{timezones().map((row: any, idx: number) => (
										<MenuItem key={idx} value={row.abbr}>
											{row.text}
										</MenuItem>
									))}
								</TextField>

								<label>
									<br /><br />
									{origImg
										? <ModalWindow imgPath={origImg} />
										: null
									}

									{props.userGroups.indexOf('EventAdmin') > -1
										? (
											<>
												<br />
												<input name="event_logo"
													className={classes.input}
													accept="image/*"
													onChange={changeImg}
													type="file" />

												<Button color="secondary"
													variant="contained"
													component="span">
													Add New Logo
												</Button>

												{eventInfo.event_logo && eventInfo.event_logo.name
													? (<span><br /><br />New:&nbsp;{eventInfo.event_logo.name}<br /></span>)
													: null
												}
											</>
										)
										: null
									}

								</label>

								{props.userGroups.indexOf('EventAdmin') > -1
									? (
										<>
											<br /><br />
											<TextField name="archived" label="Archived:" value={eventInfo.archived} onChange={onEventChange} select>
												{['true', 'false'].map((bln: string, idx: number) => (
													<MenuItem key={idx} value={bln}>
														{bln}
													</MenuItem>
												))}
											</TextField>
											<TextField name="archive_date" label="Archive Date:" value={parseFormDate(eventInfo.archive_date)} onChange={onEventChange} disabled />
											<TextField name="createdAt" label="Created Date:" value={parseFormDate(eventInfo.createdAt)} onChange={onEventChange} disabled />
											<TextField name="updatedAt" label="Updated Date:" value={parseFormDate(eventInfo.updatedAt)} onChange={onEventChange} disabled />
										</>
									)
									: null
								}

								<br />

								{showSubmit
									? (
										<div className={classes.submit}>
											<Button variant="contained"
												color="primary"
												onClick={onSubmit}>
												Save Changes
											</Button>
										</div>
									)
									: null
								}

							</form>

							<br /><FaveIcons eventId={id} />
						</>
					)
				}
			</Collapse>

		</div>
	);
};


export default EditEvent;