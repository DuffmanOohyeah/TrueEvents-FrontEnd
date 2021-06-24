import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { API, graphqlOperation } from 'aws-amplify';
import { eventIdVar } from '../../../../../stores/cache';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { listSessions, listPresenterSocialMedias } from '../../../../../graphql/queries';
import { createPresenter, createPresenterSocialMedia, updatePresenterSocialMedia } from '../../../../../graphql/mutations';
import history from '../../../../../utils/history';
import { Collapse, TextField, Button, MenuItem } from '@material-ui/core';
import { sortSessionsByName } from '../../../../../utils/sortSessions';
import titles from '../../../../../utils/titlesData';
import { putStorage } from '../../../../../utils/awsStorage';
import { socialMedia as socialMediaData } from '../../../../../utils/socialMediaData';
import { v4 as uuidV4 } from 'uuid';


interface Props {
	userGroups: string[];
};

let newPresenterUuid: string = uuidV4();


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


const AddPresenter: any = (props: Props) => {

	let { id }: any = useParams();
	const classes: any = useStyles();
	let eventId: string = useReactiveVar(eventIdVar);

	const [hideDiv, setHideDiv]: any = useState(id ? true : false);
	const [pageTitle, setPageTitle]: any = useState('Add Presenter Details');
	const [showSubmit, setShowSubmit]: any = useState(false);
	const [sessions, setSessions]: any = useState([]);
	const [presSocialMedias, setPresSocialMedias]: any = useState({});

	const [presenterInfo, setPresenterInfo]: any = useState({
		id: '',
		title: '',
		first_name: '',
		last_name: '',
		email: '',
		company: '',
		profile_img: '',
		createdAt: '',
		updatedAt: '',
		session_id: ''
	});

	const updatePresenterInfo: any = (key: string, value: string) => setPresenterInfo({...presenterInfo, [key]: value});

	const updateSocialMedias: any = (key: string, value: string) => setPresSocialMedias({...presSocialMedias, [key]: value});

	const changeImg: any = (evt: any) => {
		updatePresenterInfo(evt.target.name, evt.target.files[0]);	// key = string, value = obj
	};

	const onSubmit: any = async (evt: any) => {
		evt.preventDefault();
		let path: string = '/cms/client/event/presenters?action=';
		let action: string = 'error';
		try{
			let imgName: string = await updateImg();
			let presenter_id: string = await savePresenterData(imgName);
			insertSocialMedias(presenter_id);
			action = 'created';
		}catch( err: any ){}
		history.push(path + action);
	};

	const onPresenterChange: any = (evt: any) => {
		evt.preventDefault();
		let name: string = evt.target.name;
		let value: any = evt.target.value.trim();
		//console.log('name:', name);
		//console.log('value:', value);
		updatePresenterInfo(name, value);

		switch( name ){
			case 'first_name':
				if( value && presenterInfo.last_name ){ setShowSubmit(true); }
				else{ setShowSubmit(false); }
			break;
			case 'last_name':
				if( value && presenterInfo.first_name ){ setShowSubmit(true); }
				else{ setShowSubmit(false); }
			break;
		}
	};

	const getEvtSessions: any = async () => {
		const params: any = {
			filter: {event_id: {eq: eventId}}
		};
		const result: any = await API.graphql(graphqlOperation( listSessions, params ));
		//console.log('getEvtSessions:', result.data.listSessions.items);

		const tmpSess: any[] = [];

		result.data.listSessions.items.map((row: any) => {
			const presRow: any = (row.presenters || []);
			//console.log('row:', row);

			tmpSess.push({
				id: row.id,
				session_name: row.session_name
			});
		});

		setSessions(tmpSess);
	};

	const updateImg: any = async () => {
		let rtn: string = '';
		//console.log('updateImg:', presenterInfo.profile_img);

		if( presenterInfo.profile_img && presenterInfo.profile_img.name ){
			const s3Obj: any = await putStorage(presenterInfo.profile_img, 'presenters', newPresenterUuid);
			//console.log('s3Obj:', s3Obj);
			if( s3Obj.data.key ){
				let newLogoPath: string = s3Obj.data.key;
				updatePresenterInfo('profile_img', newLogoPath);
				rtn = newLogoPath;
			}
		}

		return rtn;
	};

	const savePresenterData: any = async (imgName: string) => {
		imgName = (imgName || presenterInfo.profile_img);
		const params: any = {
			input: {
				id: newPresenterUuid,
				session_id: presenterInfo.session_id,
				title: presenterInfo.title,
				first_name: presenterInfo.first_name,
				last_name: presenterInfo.last_name,
				email: presenterInfo.email,
				company: presenterInfo.company,
				profile_img: imgName
			}
		};

		const result: any = await API.graphql(graphqlOperation( createPresenter, params ));
		//console.log('savePresenterData:', result);
		let presenter_id: string = (result.data.createPresenter.id || '');
		return presenter_id;
	};

	const onSocialMediaChange: any = (evt: any) => {
		evt.preventDefault();
		let name: string = evt.target.name;
		let value: string = evt.target.value;
		//console.log('name:', name);
		//console.log('value:', value);
		updateSocialMedias(name, value);
	};

	const insertSocialMedias: any = (presenter_id: string) => {
		if( presenter_id ){
			socialMediaData().map((row: any) => {
				const insertParams: any = {
					input: {
						presenter_id: presenter_id,
						site: row.field,
						link: presSocialMedias[row.field]
					}
				};

				API.graphql(graphqlOperation( createPresenterSocialMedia, insertParams ));
			});
		}
	};

	const setupSocialMediaState: any = () => {
		const tmpSM: any = {};
		socialMediaData().map((row: any) => {
			tmpSM[row.field] = 'http://';
		});
		setPresSocialMedias(tmpSM);
	};

	useEffect(() => {
		setupSocialMediaState();
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

							<TextField name="title"
									label="Title:"
									select
									value={presenterInfo.title}
									onChange={onPresenterChange}>
								<MenuItem value="">
									<i>- Select -</i>
								</MenuItem>
								{titles.map((row: any, idx: number) => {
									return(
										<MenuItem key={idx} value={row.title}>
											{row.title}
										</MenuItem>
									);
								})}
							</TextField>

							<TextField name="email"
								label="Email:"
								value={presenterInfo.email}
								onChange={onPresenterChange} />

							<TextField name="first_name"
								label="First Name:"
								required
								value={presenterInfo.first_name}
								onChange={onPresenterChange} />

							<TextField name="last_name"
								label="Last Name:"
								required
								value={presenterInfo.last_name}
								onChange={onPresenterChange} />

							<TextField name="company"
								label="Company:"
								value={presenterInfo.company}
								onChange={onPresenterChange} />

							<TextField name="session_id"
									label="Session:"
									value={presenterInfo.session_id}
									onChange={onPresenterChange}
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

							<>
								<header>
									<br />Social Media Links:
								</header>
								{socialMediaData().map((row: any, idx: number) => {
									return(
										<span key={idx}>
											<TextField name={row.field}
												label={row.label}
												value={presSocialMedias[row.field]}
												onChange={onSocialMediaChange} />
										</span>
									);
								})}
							</>

							<label>
								<br /><br />

								<input name="profile_img"
									className={classes.input}
									accept="image/*"
									onChange={changeImg}
									type="file"/>

								<Button color="secondary"
									variant="contained"
									component="span">
									Add Profile Image
								</Button>

								{presenterInfo.profile_img && presenterInfo.profile_img.name
									? (<span><br /><br />New:&nbsp;{presenterInfo.profile_img.name}<br /></span>)
									: null
								}

								<br />
							</label>

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


export default AddPresenter;