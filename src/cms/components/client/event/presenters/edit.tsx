import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { API, graphqlOperation } from 'aws-amplify';
import { eventIdVar } from '../../../../../stores/cache';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { listSessions, listPresenterSocialMedias } from '../../../../../graphql/queries';
import { updatePresenter, createPresenterSocialMedia, updatePresenterSocialMedia } from '../../../../../graphql/mutations';
import history from '../../../../../utils/history';
import { Collapse, TextField, Button, MenuItem } from '@material-ui/core';
import { parseFormDate } from '../../../../../utils/parseFormDate';
import { sortSessionsByName } from '../../../../../utils/sortSessions';
import titles from '../../../../../utils/titlesData';
import ModalWindow from '../../../../../utils/imgModal';
import { putStorage } from '../../../../../utils/awsStorage';
import { socialMedia as socialMediaData } from '../../../../../utils/socialMediaData';
import FaveIcons from '../../../../../utils/showFavouriteIcons';


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


const EditPresenter: any = (props: Props) => {

	let { id }: any = useParams();
	const classes: any = useStyles();
	let eventId: string = useReactiveVar(eventIdVar);

	const [hideDiv, setHideDiv]: any = useState(false);
	const [pageTitle, setPageTitle]: any = useState('Edit Presenter Details');
	const [showSubmit, setShowSubmit]: any = useState(true);
	const [sessions, setSessions]: any = useState([]);
	const [origImg, setOrigImg]: any = useState('');
	const [presSocialMedias, setPresSocialMedias]: any = useState({});

	const [presenterInfo, setPresenterInfo]: any = useState({
		id: id,
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
			savePresenterData(imgName);
			upsertSocialMedias();
			action = 'updated';
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

			//if( !presRow.length ){	// populate the session arr (without presenters)
				tmpSess.push({
					id: row.id,
					session_name: row.session_name
				});
			//}

			for( let idx: number = 0; idx < presRow.items.length; idx++ ){
				const pres: any = presRow.items[idx];
				//console.log('pres:', pres);

				if( pres.id == id ){
					setPresenterInfo({
						id: pres.id,
						title: pres.title,
						first_name: pres.first_name,
						last_name: pres.last_name,
						email: pres.email,
						company: pres.company,
						profile_img: pres.profile_img,
						createdAt: pres.createdAt,
						updatedAt: pres.updatedAt,
						session_id: row.id	// from parent (session) obj
					});

					//setOrigSessionId(row.id);	//set incoming session id (to compare upon save)

					if( pres.profile_img ){
						setOrigImg(pres.profile_img);
					}

					break;
				}

			}
		});

		setSessions(tmpSess);
	};

	const updateImg: any = async () => {
		let rtn: string = '';
		//console.log('updateImg:', presenterInfo.profile_img);

		if( presenterInfo.profile_img && presenterInfo.profile_img.name ){
			const s3Obj: any = await putStorage(presenterInfo.profile_img, 'presenters', id);
			//console.log('s3Obj:', s3Obj);
			if( s3Obj.data.key ){
				let newLogoPath: string = s3Obj.data.key;
				updatePresenterInfo('profile_img', newLogoPath);
				rtn = newLogoPath;
			}
		}

		return rtn;
	};

	const savePresenterData: any = (imgName: string) => {
		imgName = (imgName || presenterInfo.profile_img);
		const params: any = {
			input: {
				id: presenterInfo.id,
				session_id: presenterInfo.session_id,
				title: presenterInfo.title,
				first_name: presenterInfo.first_name,
				last_name: presenterInfo.last_name,
				email: presenterInfo.email,
				company: presenterInfo.company,
				profile_img: imgName
			}
		};

		API.graphql(graphqlOperation( updatePresenter, params ));
	};

	const getSocialMedias: any = async () => {
		const params: any = {
			filter: {presenter_id: {eq: id}}
		};

		const result: any = await API.graphql(graphqlOperation( listPresenterSocialMedias, params ));
		//console.log('getSocialMedias', result);
		result.data.listPresenterSocialMedias.items.map((row: any) => {
			if( row.link ){
				updateSocialMedias(row.site, row.link);
			}
		});
	};

	const onSocialMediaChange: any = (evt: any) => {
		evt.preventDefault();
		let name: string = evt.target.name;
		let value: string = evt.target.value;
		//console.log('name:', name);
		//console.log('value:', value);
		updateSocialMedias(name, value);
	};

	const upsertSocialMedias: any = async () => {
		for( let idx: number = 0; idx < socialMediaData().length; idx++ ){
			const row: any = socialMediaData()[idx];

			const params: any = {
				filter: {
					presenter_id: {eq: id},
					site: {eq: row.field}
				}
			};
			const result: any = await API.graphql(graphqlOperation( listPresenterSocialMedias, params ));
			//console.log('result:', result);
			let smCount: number = (result.data.listPresenterSocialMedias.items.length || 0);

			if( smCount ){	// do update
				let smId: string = result.data.listPresenterSocialMedias.items[0].id;
				const updateParams: any = {
					input: {
						id: smId,
						presenter_id: id,
						site: row.field,
						link: presSocialMedias[row.field]
					}
				};
				API.graphql(graphqlOperation( updatePresenterSocialMedia, updateParams ));

			}else{	// do insert
				const insertParams: any = {
					input: {
						presenter_id: id,
						site: row.field,
						link: presSocialMedias[row.field]
					}
				};
				API.graphql(graphqlOperation( createPresenterSocialMedia, insertParams ));

			}

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
		getSocialMedias();
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
						<>
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
									{origImg
										? <ModalWindow imgPath={origImg} />
										: null
									}

									<br />

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

								{props.userGroups.indexOf('PresenterAdmin') > -1
									? (
										<><br />
											<TextField label="Created Date:" value={parseFormDate(presenterInfo.createdAt)} disabled />
											<TextField label="Updated Date:" value={parseFormDate(presenterInfo.updatedAt)} disabled />
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

							<br /><FaveIcons eventId={eventId} sessionId={presenterInfo.session_id} presenterId={id} />
						</>
					)
				}
			</Collapse>
		</div>
	);
};


export default EditPresenter;