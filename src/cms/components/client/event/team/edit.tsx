import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listUserEventJoins } from '../../../../../graphql/queries';
import {
	createUserEventJoin,
	//deleteUserEventJoin,
	createUserEventGroup,
	deleteUserEventGroup
} from '../../../../../graphql/mutations';
import { Collapse, TextField, Button, MenuItem, Avatar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { parseFormDate } from '../../../../../utils/parseFormDate';
import {
	adminGetUser,
	adminUpdateUserAttributes,
	adminEnableUser,
	adminDisableUser,
	listGroups,
	adminListGroupsForUser,
	adminAddUserToGroup
} from '../../../../../utils/cognitoService';
import titles from '../../../../../utils/titlesData';
import ModalWindow from '../../../../../utils/imgModal';
import { eventGroups } from '../../../../../utils/eventGroupData';
import { useReactiveVar } from '@apollo/client';
import { clientIdVar, userIdVar, eventIdVar } from '../../../../../stores/cache';
import history from '../../../../../utils/history';
import { putStorage, getStorage } from '../../../../../utils/awsStorage';
//import userStatus from '../../../../../utils/userStatusData';
import { isEmailValid } from '../../../../../utils/isEmailTools';


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
	},
	largeImg: {
		width: theme.spacing(10),
		height: theme.spacing(10)
	}
}));


const EditTeam: any = (props: Props) => {

	let { id }: any = useParams();
	//let userId: string = useReactiveVar(userIdVar);
	let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);
	const classes: any = useStyles();

	const [hideDiv, setHideDiv]: any = useState(false);
	const [pageTitle, setPageTitle]: any = useState('Edit Team Member Details');
	const [showSubmit, setShowSubmit]: any = useState(true);
	const [origImg, setOrigImg]: any = useState('');
	const [origGroupRows, setOrigGroupRows]: any = useState([]);
	const [userEvtGroups, setUserEvtGroups]: any = useState([]);
	const [allCognitoGroups, setAllCognitoGroups]: any = useState([]);
	const [userCognitoGroups, setUserCognitoGroups]: any = useState([]);
	const [isSuperAdmin, setIsSuperAdmin]: any = useState(false);

	const [userInfo, setUserInfo]: any = useState({
		id: id,
		enabled: false,
		status: 'UNKNOWN',
		title: '',
		first_name: '',
		last_name: '',
		email: '',
		email_verified: false,
		job_title: '',
		profile_img: '',
		createDate: '',
		updatedDate: ''
	});

	const updateUserInfo: any = (key: string, value: string) => setUserInfo({...userInfo, [key]: value});

	const onUserChange: any = (evt: any) => {
		evt.preventDefault();
		let name: string = evt.target.name;
		let value: any = evt.target.value.trim();
		//console.log('name:', name);
		//console.log('value:', value);
		updateUserInfo(name, value);

		switch( name ){
			case 'email':
				if( value && isEmailValid(value) ){ setShowSubmit(true); }
				else{ setShowSubmit(false); }
			break;
		}
	};

	const onSubmit: any = async (evt: any) => {
		evt.preventDefault();
		let path: string = '/cms/client/event/team?action=';
		let action: string = 'error';

		try{
			ableUser();
			let imgName: string = await updateImg();
			updateCognitoAtts(imgName);
			updateCognitoGroups();
			removeOrigGroups();
			let joinId: string = await getJoinId();
			addNewGroups(joinId);
			action = 'updated';
		}catch( err: any ){}

		history.push(path + action);
	};

	const updateImg: any = async () => {
		let rtn: string = '';
		//console.log('updateImg:', userInfo.profile_img);

		if( userInfo.profile_img && userInfo.profile_img.name ){
			const s3Obj: any = await putStorage(userInfo.profile_img, 'user', id);
			//console.log('s3Obj:', s3Obj);
			if( s3Obj.data.key ){
				let newLogoPath: string = s3Obj.data.key;
				updateUserInfo('profile_img', newLogoPath);
				rtn = newLogoPath;
			}
		}

		return rtn;
	};

	const updateCognitoAtts: any = (imgName: string = '') => {
		//console.log('userInfo:', userInfo);
		imgName = (imgName || userInfo.profile_img);
		const newAtts: any[] = [
			{ Name: 'email', Value: userInfo.email },
			{ Name: 'email_verified', Value: userInfo.email_verified.toString() },
			{ Name: 'custom:title', Value: userInfo.title },
			{ Name: 'custom:first_name', Value: userInfo.first_name },
			{ Name: 'custom:last_name', Value: userInfo.last_name },
			{ Name: 'custom:job_title', Value: userInfo.job_title },
			{ Name: 'custom:profile_img', Value: imgName }
		];
		adminUpdateUserAttributes(userInfo.id, newAtts);
	};

	const ableUser: any = () => {
		switch( userInfo.enabled ){
			case 'true':
				adminEnableUser(id);
			break;
			default:
				adminDisableUser(id);
			break;
		}
	};

	const getJoinId: any = async () => {
		const params: any = {
			input: {
				cognito_sub: id,	// use the id of the user being editted
				client_id: clientId,
				userEventJoinEventId: eventId
			}
		};

		const result: any = await API.graphql(graphqlOperation( createUserEventJoin, params ));
		let joinId: string = (result.data.createUserEventJoin.id || '');
		return joinId;
	};

	const removeOrigGroups: any = () => {
		origGroupRows.map((row: any) => {
			API.graphql(graphqlOperation( deleteUserEventGroup, {input: {id: row.id}} ));
			//API.graphql(graphqlOperation( deleteUserEventJoin, {input: {id: row.join_id}} ));
		});
	};

	const addNewGroups: any = (joinId: string) => {
		if( joinId ){
			userEvtGroups.map((name: string) => {
				const params: any = {
					input: {
						join_id: joinId,
						name: name,
						active: true
					}
				};
				API.graphql(graphqlOperation( createUserEventGroup, params ));

				/*const joinParams: any = {
					input: {
						cognito_sub: userId,
						client_id: clientId,
						userEventJoinEventId: eventId
					}
				}
				API.graphql(graphqlOperation( createUserEventJoin, joinParams ));*/
			});
		}
	};

	const getCognitoUser: any = () => {
		adminGetUser(id)
			.then((result: any) => {
				const tmpUser: any = {};

				//console.log('result:', result);
				try{
					tmpUser.enabled = result.Enabled.toString();
					tmpUser.status = result.UserStatus;

					result.UserAttributes.map((atts: any) => {
						switch( atts.Name ){
							case 'sub':
								tmpUser.id = atts.Value;
							break;
							case 'custom:title':
								tmpUser.title = atts.Value;
							break;
							case 'custom:first_name':
								tmpUser.first_name = atts.Value;
							break;
							case 'custom:last_name':
								tmpUser.last_name = atts.Value;
							break;
							case 'email':
							case 'email_verified':
								tmpUser[atts.Name] = atts.Value.toString();
							break;
							case 'custom:job_title':
								tmpUser.job_title = atts.Value;
							break;
							case 'custom:profile_img':
								tmpUser.profile_img = atts.Value;
								setOrigImg(atts.Value);
							break;

						}
					});
				}catch( err: any ){}

				//console.log('tmpUser:', tmpUser);
				setUserInfo(tmpUser);
			});
	};

	const changeImg: any = (evt: any) => {
		updateUserInfo(evt.target.name, evt.target.files[0]);	// key = string, value = obj
	};

	const onMultiSelect: any = (evt: any) => {
		evt.preventDefault();
		let name: string = evt.target.name;
		let values: string = evt.target.value;

		switch( name ){
			case 'userEvtGroups':
				setUserEvtGroups(values);
			break;
			case 'userCognitoGroups':
				setUserCognitoGroups(values);
			break;
		}
	};

	const getEvtJoins: any = async () => {
		const params: any = {
			filter: {
				cognito_sub: {eq: id},
				client_id: {eq: clientId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listUserEventJoins, params ));
		const joins: any[] = (result.data.listUserEventJoins.items || []);
		//console.log('getEvtJoins:', joins);

		try{
			const tmpGrpNames: string[] = [];
			const tmpGrpData: any[] = [];

			joins.map((row: any) => {
				if( row.event && (row.event.id == eventId) ){
					row.groups.items.map((grp: any) => {
						tmpGrpNames.push(grp.name);
						tmpGrpData.push({
							id: grp.id,
							join_id: grp.join_id,
							name: grp.name
						});
					});
				}
			});

			//console.log('tmpGrpData:', tmpGrpData);
			setUserEvtGroups(tmpGrpNames);	// this will get overwritten via select box choices
			setOrigGroupRows(tmpGrpData);	// this does not get overwritten
		}catch( err: any ){}
	};

	const getAllCognitoGroups: any = () => {
		listGroups()
			.then((data: any) => {
				//console.log('getAllGroups:', data);
				const tmpGroups: string[] = [];
				data.Groups.map((row: any) => {
					if( row.GroupName !== 'SuperAdmin' ){
						tmpGroups.push(row.GroupName);
					}
				});
				if( tmpGroups.length ){
					setAllCognitoGroups(tmpGroups);
				}
				//console.log('tmpGroups:', tmpGroups);
			});
	};

	const updateCognitoGroups: any = () => {
		const groups: string[] = userCognitoGroups;

		if( isSuperAdmin ){
			groups.push('SuperAdmin');
		}

		adminAddUserToGroup(id, groups);
	};

	const getUserCognitoGroups: any = () => {
		adminListGroupsForUser(id)
			.then((data: any) => {
				//console.log('data:', data);
				const tmpGroups: string[] = [];
				data.Groups.map((row: any) => {
					tmpGroups.push(row.GroupName);
					if( row.GroupName == 'SuperAdmin' ){
						setIsSuperAdmin(true);
					}
				});
				if( tmpGroups.length ){
					setUserCognitoGroups(tmpGroups);
				}
				//console.log('tmpGroups:', tmpGroups);
			});
	};

	const populateImg: any = async () => {
		if( userInfo.profile_img ){
			try{
				const getS3Obj: any = await getStorage(userInfo.profile_img);
				if( getS3Obj.success ){
					setOrigImg(getS3Obj.data);
				}
			}catch( err: any ){}
		}
	};

	useEffect(() => {
		getCognitoUser();
		getEvtJoins();
		getAllCognitoGroups();
		getUserCognitoGroups();
		setTimeout(() => {
			populateImg();
		}, 1000);
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
						<form className={classes.root}>

							<TextField name="title"
									label="Title:"
									select
									value={userInfo.title}
									onChange={onUserChange}>
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

							<TextField name="job_title"
								label="Job Title:"
								value={userInfo.job_title}
								onChange={onUserChange} />

							<TextField name="first_name"
								label="First Name:"
								value={userInfo.first_name}
								onChange={onUserChange} />

							<TextField name="last_name"
								label="Last Name:"
								value={userInfo.last_name}
								onChange={onUserChange} />

							<TextField name="email"
								label="Email:"
								required
								value={userInfo.email}
								onChange={onUserChange} />

							<TextField name="email_verified"
									label="Email Verified:"
									select
									value={userInfo.email_verified}
									onChange={onUserChange}>
								{['true', 'false'].map((bln: string, idx: number) => {
									return(
										<MenuItem key={idx} value={bln}>
											{bln}
										</MenuItem>
									);
								})}
							</TextField>

							<TextField name="enabled"
									label="Account Enabled:"
									select
									value={userInfo.enabled}
									onChange={onUserChange}>
								{['true', 'false'].map((bln: string, idx: number) => {
									return(
										<MenuItem key={idx} value={bln}>
											{bln}
										</MenuItem>
									);
								})}
							</TextField>

							<TextField name="status"
									label="Account Status:"
									disabled
									value={userInfo.status} />

							<TextField name="userCognitoGroups"
									label="Account Groups:"
									select
									SelectProps={{
										multiple: true,
										value: userCognitoGroups,
										onChange: onMultiSelect
									  }}>
								{allCognitoGroups.map((name: string, idx: number) => {
									return(
										<MenuItem key={idx} value={name}>
											{name}
										</MenuItem>
									);
								})}
							</TextField>

							<TextField name="userEvtGroups"
									label="Event Groups:"
									select
									SelectProps={{
										multiple: true,
										value: userEvtGroups,
										onChange: onMultiSelect
									  }}>
								{eventGroups().map((row: any, idx: number) => {
									return(
										<MenuItem key={idx} value={row.name}>
											{row.name} ({row.label})
										</MenuItem>
									);
								})}
							</TextField>

							<label>{/*<ModalWindow imgPath={origImg} />*/}
								<br /><br />
								{origImg
									? (<Avatar alt="" src={origImg} className={classes.largeImg} />)
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

								{userInfo.profile_img && userInfo.profile_img.name
									? (<span><br /><br />New:&nbsp;{userInfo.profile_img.name}<br /></span>)
									: null
								}
							</label>

							{props.userGroups.indexOf('TeamAdmin') > -1
								? (
									<><br />
										<TextField label="Created Date:" value={parseFormDate(userInfo.createDate)} disabled />
										<TextField label="Updated Date:" value={parseFormDate(userInfo.updatedDate)} disabled />
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


export default EditTeam;