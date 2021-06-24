import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createUserEventJoin, createUserEventGroup, createUser } from '../../../../../graphql/mutations';
import { Collapse, TextField, Button, MenuItem } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
	adminUpdateUserAttributes,
	adminEnableUser,
	adminDisableUser,
	listGroups,
	adminAddUserToGroup,
	adminCreateUser
} from '../../../../../utils/cognitoService';
import titles from '../../../../../utils/titlesData';
import { eventGroups } from '../../../../../utils/eventGroupData';
import { useReactiveVar } from '@apollo/client';
import { clientIdVar, eventIdVar } from '../../../../../stores/cache';
import history from '../../../../../utils/history';
import { putStorage } from '../../../../../utils/awsStorage';
import { isEmailValid } from '../../../../../utils/isEmailTools';
import { v4 as uuidV4 } from 'uuid';


interface Props {};


let newUuid: string = uuidV4();


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


const AddTeam: any = (props: Props) => {

	let { id }: any = useParams();
	let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);
	const classes: any = useStyles();

	const [hideDiv, setHideDiv]: any = useState(id ? true : false);
	const [pageTitle, setPageTitle]: any = useState('Add Team Member Details');
	const [showSubmit, setShowSubmit]: any = useState(false);
	const [userEvtGroups, setUserEvtGroups]: any = useState([]);
	const [allCognitoGroups, setAllCognitoGroups]: any = useState([]);
	const [userCognitoGroups, setUserCognitoGroups]: any = useState(['Guest']);

	const [userInfo, setUserInfo]: any = useState({
		id: newUuid,
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
		let msg: string = '';

		try{
			let userName: string = await createUser();
			let imgName: string = await addImg(userName);
			ableUser(userName);
			addCognitoGroups(userName);
			addCognitoAtts(userName, imgName);
			let joinId: string = await getJoinId(userName);
			addNewGroups(joinId);
			action = 'created';
		}catch( err: any ){
			//console.log('err:', err);
			msg = '&msg=' + encodeURIComponent(err.message);
		}

		history.push(path + action + msg);
	};

	const createUser: any = async () => {
		const result: any = await adminCreateUser(userInfo.email, {});
		//console.log('createUser:', result);
		let userName: string = (result.User.Username || '');	// should be uuid
		return userName;
	};

	const addImg: any = async (userName: string) => {
		let rtn: string = '';
		//console.log('addImg:', userInfo.profile_img);

		if( userInfo.profile_img && userInfo.profile_img.name ){
			const s3Obj: any = await putStorage(userInfo.profile_img, 'user', userName);
			//console.log('s3Obj:', s3Obj);
			if( s3Obj.data.key ){
				let newLogoPath: string = s3Obj.data.key;
				updateUserInfo('profile_img', newLogoPath);
				rtn = newLogoPath;
			}
		}

		return rtn;
	};

	const addCognitoAtts: any = (userName: string, imgName: string) => {
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
		//console.log('newAtts:', newAtts);
		adminUpdateUserAttributes(userName, newAtts);
	};

	const ableUser: any = (userName: string) => {
		switch( userInfo.enabled ){
			case 'true':
				adminEnableUser(userName);
			break;
			default:
				adminDisableUser(userName);
			break;
		}
	};

	const getJoinId: any = async (userName: string) => {
		const params: any = {
			input: {
				cognito_sub: userName,
				client_id: clientId,
				userEventJoinEventId: eventId
			}
		};

		const result: any = await API.graphql(graphqlOperation( createUserEventJoin, params ));
		let joinId: string = (result.data.createUserEventJoin.id || '');
		return joinId;
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
			});
		}
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

	const addCognitoGroups: any = (userName: string) => adminAddUserToGroup(userName, userCognitoGroups);

	useEffect(() => {
		getAllCognitoGroups();
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

								{userInfo.profile_img && userInfo.profile_img.name
									? (<span><br /><br />New:&nbsp;{userInfo.profile_img.name}<br /></span>)
									: null
								}
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


export default AddTeam;