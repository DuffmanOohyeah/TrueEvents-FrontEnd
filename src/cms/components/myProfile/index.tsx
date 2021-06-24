import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import CmsBreadcrumb from '../../../utils/cmsBreadcrumb';
import { userEmailVar, userIdVar } from '../../../stores/cache';
import { useReactiveVar } from '@apollo/client';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';
import {
	adminGetUser,
	adminUpdateUserAttributes,
	adminListGroupsForUser,
	listGroups,
	adminSetUserPassword
} from '../../../utils/cognitoService';
import { listClients, listUserClientJoins } from '../../../graphql/queries';
import {
	InputLabel,
	MenuItem,
	TextField,
	Button,
	TextareaAutosize,
	Checkbox,
	Avatar
} from '@material-ui/core';
//import ModalWindow from '../../../utils/imgModal';
import titles from '../../../utils/titlesData';
import { sortClientsByName } from '../../../utils/sortClients';
import { putStorage, getStorage } from '../../../utils/awsStorage';
import history from '../../../utils/history';
import queryString from 'query-string';
import ShowAlert from '../showAlert';
import { validatePwd } from '../../../utils/pwdTools';


interface Props {};

let dtFormat: string = 'DD/MM/YYYY HH:mm';

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
	},
	pwdCriteria: {
		width: '100%',
		color: '#808080',
		fontSize: '13px'
	},
	largeImg: {
		width: theme.spacing(10),
		height: theme.spacing(10)
	}
}));


const MyProfile: any = (props: Props) => {

	let userId: string = useReactiveVar(userIdVar);
	let userEmail: string = useReactiveVar(userEmailVar);
	const classes: any = useStyles();

	const [showSubmit, setShowSubmit]: any = useState(true);
	const [origImg, setOrigImg]: any = useState('');
	const [userGroups, setUserGroups]: any = useState([]);
	const [allGroups, setAllGroups]: any = useState([]);
	const [allClients, setAllClients]: any = useState([]);
	//const [userClientJoinIds, setUserClientJoinIds]: any = useState([]);
	const [clientIds, setClientIds]: any = useState([]);
	const [showPwdFields, setShowPwdFields]: any = useState(false);

	const [alert, setAlert]: any = useState({
		show: false,
		severity: 'success',
		text: ''
	});

	const [pwdInfo, setPwdInfo]: any = useState({
		new_password: '',
		confirm_password: ''
	});

	const updatePwdInfo: any = (key: string, value: string) => setPwdInfo({...pwdInfo, [key]: value});

	const [userBasics, setUserBasics]: any = useState({
		user_name: userId,
		email: userEmail,
		email_verified: false,
		enabled: false,
		status: 'UNKNOWN',
		createDate: '',
		modifiedDate: ''
	});

	const [userAtts, setUserAtts]: any = useState({
		title: '',
		first_name: '',
		last_name: '',
		job_title: '',
		profile_img: ''
	});

	const getCognitoUser: any = () => {
		adminGetUser(userId)
			.then((data: any) => {
				//console.log('data:', data);
				const atts: any = {
					email: '',
					email_verified: '',
					title: '',
					first_name: '',
					last_name: '',
					job_title: '',
					profile_img: ''
				};

				data.UserAttributes.map((att: any) => {
					let newName: string = att.Name.replace('custom:', '');
					atts[newName] = att.Value;
				});

				setUserBasics({
					user_name: data.Username,
					email: atts.email,
					email_verified: atts.email_verified.toString(),
					enabled: data.Enabled.toString(),
					status: data.UserStatus,
					createDate: moment(data.UserCreateDate).format(dtFormat),
					modifiedDate: moment(data.UserLastModifiedDate).format(dtFormat)
				});

				setUserAtts({
					title: atts.title,
					first_name: atts.first_name,
					last_name: atts.last_name,
					job_title: atts.job_title,
					profile_img: atts.profile_img
				});

				//setOrigImg(atts.profile_img);

				adminListGroupsForUser(data.Username)
					.then((data: any) => {
						//console.log('data:', data);
						const tmpGroups: string[] = [];
						data.Groups.map((row: any) => tmpGroups.push(row.GroupName));
						if( tmpGroups.length ){ setUserGroups(tmpGroups); }
						//console.log('tmpGroups:', tmpGroups);
					});
			});
	};

	const getAllGroups: any = () => {
		listGroups()
			.then((data: any) => {
				//console.log('getAllGroups:', data);
				const tmpGroups: string[] = [];
				data.Groups.map((row: any) => tmpGroups.push(row.GroupName));
				if( tmpGroups.length ){ setAllGroups(tmpGroups); }
				//console.log('tmpGroups:', tmpGroups);
			});
	};

	const getAllClients: any = async () => {
		const result: any = await API.graphql(graphqlOperation( listClients ));
		//console.log('result:', result);
		const clients: any[] = (result.data.listClients.items || []);
		if( clients.length ){ setAllClients(clients); }
	};

	const getClientJoins: any = async () => {
		const params: any = {
			filter: {cognito_sub: {eq: userId}}
		};

		const result: any = await API.graphql(graphqlOperation( listUserClientJoins, params ));
		const joins: any[] = (result.data.listUserClientJoins.items || []);
		//console.log('getClientJoins:', joins);

		//const tmpJoinIds: string[] = [];
		const tmpClientIds: string[] = [];

		joins.map((join: any) => {
			//tmpJoinIds.push(join.id);
			if( join.client ){
				tmpClientIds.push(join.client.id);
			}
		});

		//if( tmpJoinIds.length ){ setUserClientJoinIds(tmpJoinIds); }
		if( tmpClientIds.length ){ setClientIds(tmpClientIds); }
	};

	const onAttChange: any = (evt: any) => {
		let name: string = evt.target.name;
		let value: string = evt.target.value;
		updateUserAtts(name, value);

		switch( name ){
			case 'first_name':
				if( value && userAtts.last_name ){ setShowSubmit(true); }
				else{ setShowSubmit(false); }
			break;
			case 'last_name':
				if( value && userAtts.first_name ){ setShowSubmit(true); }
				else{ setShowSubmit(false); }
			break;
		}
	};

	const updateUserAtts: any = (key: string, value: string) => setUserAtts({...userAtts, [key]: value});

	const changeImg: any = (evt: any) => {
		//console.log('file:', evt.target.files[0]);
		updateUserAtts(evt.target.name, evt.target.files[0]);	// key = string, value = obj
	};

	const listMyClients: any = () => {
		let clientList: string = '';

		sortClientsByName(allClients).map((row: any) => {
			// /console.log('row:', row);
			if( clientIds.indexOf(row.id) > -1 ){
				clientList += row.full_name + '\n';
			}
		});

		return clientList;
	};

	const listMyGroups: any = () => {
		let groupList: string = '';

		allGroups.sort().map((grp: string) => {
			if( userGroups.indexOf(grp) > -1 ){
				groupList += grp + '\n';
			}
		});

		return groupList;
	};

	const updateImg: any = async () => {
		let rtn: string = '';
		//console.log('updateImg:', userAtts.profile_img);
		if( userAtts.profile_img && userAtts.profile_img.name ){
			const s3Obj: any = await putStorage(userAtts.profile_img, 'user', userId);
			//console.log('s3Obj:', s3Obj);
			if( s3Obj.data.key ){
				let newLogoPath: string = s3Obj.data.key;
				updateUserAtts('profile_img', newLogoPath);
				rtn = newLogoPath;
			}
		}
		return rtn;
	};

	const updateAtts: any = (imgName: string = '') => {
		//console.log('atts:', userAtts);
		imgName = (imgName || userAtts.profile_img);
		const newAtts: any[] = [
			{ Name: 'custom:title', Value: userAtts.title },
			{ Name: 'custom:first_name', Value: userAtts.first_name },
			{ Name: 'custom:last_name', Value: userAtts.last_name },
			{ Name: 'custom:job_title', Value: userAtts.job_title },
			{ Name: 'custom:profile_img', Value: imgName }
		];
		adminUpdateUserAttributes(userBasics.user_name, newAtts);
	};

	const onSubmit: any = async (evt: any) => {
		evt.preventDefault();
		let path: string = '/cms/myprofile?action=';
		let action: string = 'error';

		try{
			let imgName: string = await updateImg();
			updateAtts(imgName);
			updateCognitoPwd();
			action = 'updated';
		}catch( err: any ){}

		setTimeout(() => {
			history.push(path + action);
		}, 500);
	};

	const updateCognitoPwd: any = () => {
		if( showPwdFields && pwdInfo.new_password ){
			if( pwdInfo.new_password === pwdInfo.confirm_password ){
				const pwdAtts: any = {
					Password: pwdInfo.new_password,
					Permanent: true,
					Username: userId
				 };
				adminSetUserPassword(pwdAtts);	// returns promise
			}
		}
	};

	const showAlert: any = () => {
		const parsed: any = queryString.parse(window.location.search);
		switch( parsed.action ){
			case 'updated':
				setAlert({
					show: true,
					severity: 'success',
					text: 'Your profile updated successfully.'
				});
			break;
			case 'error':
				setAlert({
					show: true,
					severity: 'error',
					text: 'There was an error updating your profile.'
				});
			break;
		}
	};

	const isSubmitBtnVisible: any = () => {
		let show: boolean = false;

		if( userAtts.first_name && userAtts.last_name ){ show = true; }

		const pwdNl: any = document.getElementsByName('changePwd');
		const pwdElem: any = Array.prototype.slice.call(pwdNl)[0];

		if( pwdElem.checked ){
			try{	// fields may not exist in DOM
				const newPwd: any = document.getElementsByName('new_password');
				const newElem: any = Array.prototype.slice.call(newPwd)[0];

				const confPwd: any = document.getElementsByName('confirm_password');
				const confElem: any = Array.prototype.slice.call(confPwd)[0];

				if( validatePwd(newElem.value) ){
					if( newElem.value === confElem.value ){ show = true; }
					else{ show = false; }
				}else{
					show = false;
				}
			}catch( err: any  ){
				//console.log('err:', err.message);
			}
		}

		if( show ){ setShowSubmit(true); }
		else{ setShowSubmit(false); }
	};

	const handlePwd: any = (evt: any) => {
		switch( evt.target.checked ){
			case true:
				setShowPwdFields(true);
			break;
			case false:
				setShowPwdFields(false);
			break;
		}

		isSubmitBtnVisible();
	};

	const onPwdChange: any = (evt: any) => {
		let name: string = evt.target.name;
		let value: string = evt.target.value;
		//console.log(`${name}: ${value}`);
		updatePwdInfo(name, value);
		isSubmitBtnVisible();
	};

	const populateImg: any = async () => {
		if( userAtts.profile_img ){
			try{
				const getS3Obj: any = await getStorage(userAtts.profile_img);
				//console.log('getS3Obj:', getS3Obj);
				if( getS3Obj.success ){
					//updateUserAtts('profile_img', getS3Obj.data);
					setOrigImg(getS3Obj.data);
				}
			}catch( err: any ){}
		}
	};

	useEffect(() => {
		getCognitoUser();
		getAllGroups();
		getAllClients();
		getClientJoins();
		showAlert();
		setTimeout(() => {
			populateImg();
		}, 1000);
	}, []);

	return(
		<div>

			<CmsBreadcrumb section="My Profile" />
			<br />

			{alert.show
				? (<ShowAlert show={alert.show} severity={alert.severity} text={alert.text} />)
				: null
			}

			<form className={classes.root}>

				<TextField name="title"
						select
						label="Title:"
						value={userAtts.title}
						onChange={onAttChange}>
					<MenuItem value="">
						- Select -
					</MenuItem>
					{titles.map((row: any, idx: number) => {
						return(
							<MenuItem key={idx} value={row.title}>
								{row.title}
							</MenuItem>
						);
					})}
				</TextField>

				<TextField name="first_name" label="First Name:" value={userAtts.first_name} onChange={onAttChange} required />
				<TextField name="last_name" label="Last Name:" value={userAtts.last_name} onChange={onAttChange} required />
				<TextField name="job_title" label="Job Title:" value={userAtts.job_title} onChange={onAttChange} />
				<TextField name="email" label="Email:" value={userBasics.email} disabled />
				<TextField name="status" label="Account Status:" value={userBasics.status} disabled />
				<TextField name="createDate" label="Date Created:" value={userBasics.createDate} disabled />
				{/*<TextField name="modifiedDate" label="Date Modified:" value={userBasics.modifiedDate} disabled />*/}

				<div style={{ verticalAlign: 'text-top', width: '100%', height: '100px' }}>
					<div style={{ float: 'left', width: '45%' }}>
						<InputLabel>Groups:</InputLabel>
						<TextareaAutosize rowsMin={3} rowsMax={5} defaultValue={listMyGroups()} disabled />
					</div>
					<div style={{ float: 'right', width: '55%' }}>
						<InputLabel>Clients:</InputLabel>
						<TextareaAutosize rowsMin={3} rowsMax={5} defaultValue={listMyClients()} disabled />
					</div>
				</div>

				<InputLabel>
					Change Password?
					<Checkbox name="changePwd" onChange={handlePwd} color="primary" />
				</InputLabel>

				{showPwdFields
					? (
						<>
							<div className={classes.pwdCriteria}>
								Minimum password criteria:<br />
								8 characters including -
								1 uppercase letter,
								1 lowercase letter,
								1 number,
								1 special character
							</div>

							<TextField name="new_password"
								label="New Password:"
								type="password"
								value={pwdInfo.new_password}
								onChange={onPwdChange} />

							<TextField name="confirm_password"
								label="Confirm Password:"
								type="password"
								value={pwdInfo.confirm_password}
								onChange={onPwdChange} />
						</>
					)
					: null
				}

				<div style={{ display: 'block' }}>
					<br />
					<label>
						{/*<ModalWindow imgPath={origImg} />*/}
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
							Add New Image
						</Button>

						{userAtts.profile_img && userAtts.profile_img.name
							? (<span><br /><br />New:&nbsp;{userAtts.profile_img.name}<br /></span>)
							: null
						}
					</label>
				</div>

				<br />

				{showSubmit
					? (
						<div className={classes.submit}>
							<Button variant="contained"
								color="primary"
								onClick={onSubmit}>
								Save Your Profile
							</Button>
						</div>
					)
					: null
				}

			</form>

		</div>
	);

};


export default MyProfile;