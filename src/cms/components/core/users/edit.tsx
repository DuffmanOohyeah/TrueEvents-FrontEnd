import { useState, useEffect } from 'react';
import {
	adminGetUser,
	adminUpdateUserAttributes,
	adminEnableUser,
	adminDisableUser,
	adminListGroupsForUser,
	listGroups,
	adminAddUserToGroup
} from '../../../../utils/cognitoService';
import { useParams } from 'react-router-dom';
import history from '../../../../utils/history';
import moment from 'moment';
import {
	InputLabel,
	Collapse,
	MenuItem,
	TextField,
	Button,
	Select
} from '@material-ui/core';
import titles from '../../../../utils/titlesData';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import userStatus from '../../../../utils/userStatusData';
import { putStorage } from '../../../../utils/awsStorage';
import ModalWindow from '../../../../utils/imgModal';
import { listClients, listUserClientJoins } from '../../../../graphql/queries';
import { createUserClientJoin, deleteUserClientJoin } from '../../../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';


interface Props {};


let dtFormat: string = 'DD/MM/YYYY';
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


const EditUser: any = (props: Props) => {

	let { id }: any = useParams();
	const [hideDiv, setHideDiv]: any = useState(false);
	const [origImg, setOrigImg]: any = useState('');
	const [userBasics, setUserBasics]: any = useState({
		user_name: '',
		email: '',
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
	const [clientIds, setClientIds]: any = useState([]);
	const [userClientJoinIds, setUserClientJoinIds]: any = useState([]);
	const [allClients, setAllClients]: any = useState([]);
	const [userGroups, setUserGroups]: any = useState([]);
	const [allGroups, setAllGroups]: any = useState([]);
	const classes: any = useStyles();

	const getCognitoUser: any = () => {
		adminGetUser(id)
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

				setOrigImg(atts.profile_img);

				adminListGroupsForUser(data.Username)
					.then((data: any) => {
						//console.log('data:', data);
						const tmpGroups: string[] = [];
						data.Groups.map((row: any) => tmpGroups.push(row.GroupName));
						if( tmpGroups.length ){
							setUserGroups(tmpGroups);
						}
						//console.log('tmpGroups:', tmpGroups);
					});
			});
	};

	const onBasicChange: any = (evt: any) => updateUserBasics(evt.target.name, evt.target.value);
	const updateUserBasics: any = (key: string, value: string) => setUserBasics({...userBasics, [key]: value});

	const onAttChange: any = (evt: any) => updateUserAtts(evt.target.name, evt.target.value);
	const updateUserAtts: any = (key: string, value: string) => setUserAtts({...userAtts, [key]: value});

	const onSubmit: any = async (evt: any) => {
		evt.preventDefault();
		let path: string = '/cms/core/users?action=';
		let action: string = 'error';
		try{
			let imgName: string = await updateImg();
			ableUser();
			updateGroups();
			updateClients();
			updateAtts(imgName);
			action = 'updated';
		}catch( err: any ){}
		history.push(path + action);
	};

	const updateImg: any = async () => {
		let rtn: string = '';
		//console.log('updateImg:', userAtts.profile_img);
		if( userAtts.profile_img && userAtts.profile_img.name ){
			const s3Obj: any = await putStorage(userAtts.profile_img, 'user', id);
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
			//{ Name: 'email', Value: userBasics.email },
			{ Name: 'email_verified', Value: userBasics.email_verified },
			{ Name: 'custom:title', Value: userAtts.title },
			{ Name: 'custom:first_name', Value: userAtts.first_name },
			{ Name: 'custom:last_name', Value: userAtts.last_name },
			{ Name: 'custom:job_title', Value: userAtts.job_title },
			{ Name: 'custom:profile_img', Value: imgName }
		];
		adminUpdateUserAttributes(userBasics.user_name, newAtts);
	};

	const updateGroups: any = () => {
		//console.log('value 1:', userGroups);
		adminAddUserToGroup(userBasics.user_name, userGroups);
	};

	const ableUser: any = () => {
		switch( userBasics.enabled ){
			case 'true':
				adminEnableUser(userBasics.user_name);
			break;
			default:
				adminDisableUser(userBasics.user_name);
			break;
		}
	};

	const getAllGroups: any = () => {
		listGroups()
			.then((data: any) => {
				//console.log('getAllGroups:', data);
				const tmpGroups: string[] = [];
				data.Groups.map((row: any) => tmpGroups.push(row.GroupName));
				if( tmpGroups.length ){
					setAllGroups(tmpGroups);
				}
				//console.log('tmpGroups:', tmpGroups);
			});
	};

	const onMultiSelect: any = (evt: any) => {
		evt.preventDefault();
		//console.log('value 1:', evt.target.value);
		switch( evt.target.name ){
			case 'groups':
				setUserGroups(evt.target.value);
			break;
			case 'clientIds':
				//updateClientIds(evt.target.value);
				setClientIds(evt.target.value);
			break;
		}
	};

	const changeImg: any = (evt: any) => {
		//console.log('file:', evt.target.files[0]);
		updateUserAtts(evt.target.name, evt.target.files[0]);	// key = string, value = obj
	};

	const getAllClients: any = async () => {
		const result: any = await API.graphql(graphqlOperation(
			listClients
		));
		//console.log('result:', result);
		try{
			setAllClients(result.data.listClients.items);
		}catch( err: any ){}
	};

	const getClientJoins: any = async () => {
		const params: any = {
			filter: {cognito_sub: {eq: id}}
		};

		const result: any = await API.graphql(graphqlOperation( listUserClientJoins, params ));
		const joins: any[] = (result.data.listUserClientJoins.items || []);
		//console.log('getClientJoins:', result);

		const tmpJoinIds: string[] = [];
		const tmpClientIds: string[] = [];

		joins.map((join: any) => {
			tmpJoinIds.push(join.id);
			if( join.client ){
				tmpClientIds.push(join.client.id);
			}
		});

		if( tmpJoinIds.length ){ setUserClientJoinIds(tmpJoinIds); }
		if( tmpClientIds.length ){ setClientIds(tmpClientIds); }
	};

	const updateClients: any = async () => {

		/* start: delete existing joins */
		userClientJoinIds.map((joinId: string) => {
			const params: any = {
				input: {id: joinId}
			};
			API.graphql(graphqlOperation( deleteUserClientJoin, params ));
		});
		/* end: delete existing joins */

		/* start: add new joins */
		clientIds.map((cId: string) => {
			const params: any = {
				input: {
					cognito_sub: id,
					userClientJoinClientId: cId
				}
			};
			API.graphql(graphqlOperation( createUserClientJoin, params ));
		});
		/* end: add new joins */

	};

	useEffect(() => {
		getCognitoUser();
		getAllGroups();
		getAllClients();
		getClientJoins();
		//console.log('userAtts:', userAtts);
	}, []);

	return(
		<div>

			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				Edit User
			</div>

			<Collapse in={true}>
				{hideDiv
					? null
					: (
						<form className={classes.root}>
							<TextField name="title"
									select
									label="Title:"
									value={userAtts.title}
									//helperText="Your name title"
									onChange={onAttChange}>
								{titles.map((row: any, idx: number) => (
									<MenuItem key={idx} value={row.title}>
										{row.title}
									</MenuItem>
								))}
							</TextField>
							<TextField name="first_name" label="First Name:" value={userAtts.first_name} onChange={onAttChange} />
							<TextField name="last_name" label="Last Name:" value={userAtts.last_name} onChange={onAttChange} />
							<TextField name="job_title" label="Job Title:" value={userAtts.job_title} onChange={onAttChange} />
							<TextField name="email" label="Email:" value={userBasics.email} disabled />
							<TextField name="email_verified"
									select
									label="Email Verified:"
									value={userBasics.email_verified}
									//helperText="Verify your email"
									onChange={onBasicChange}>
								{['true', 'false'].map((bln: string, idx: number) => (
									<MenuItem key={idx} value={bln}>
										{bln}
									</MenuItem>
								))}
							</TextField>
							<TextField name="enabled"
									select
									label="Account Enabled:"
									value={userBasics.enabled}
									//helperText="Enable your account"
									onChange={onBasicChange}>
								{['true', 'false'].map((bln: any, idx: number) => (
									<MenuItem key={idx} value={bln}>
										{bln}
									</MenuItem>
								))}
							</TextField>
							<TextField name="status"
									disabled
									select
									label="Account Status:"
									value={userBasics.status}
									//helperText="Your account status"
									onChange={onBasicChange}>
								{userStatus.map((row: any, idx: number) => (
									<MenuItem key={idx} value={row.status}>
										{row.status}
									</MenuItem>
								))}
							</TextField>
							<TextField name="createDate" label="Date Created:" value={userBasics.createDate} disabled />
							<TextField name="modifiedDate" label="Date Modified:" value={userBasics.modifiedDate} disabled />

							<div style={{ width: '100%' }}>
								<div style={{ float: 'left', width: '45%' }}>
									<InputLabel id="group-box">Groups:</InputLabel>
									<Select name="groups"
											labelId="group-box"
											multiple
											autoWidth
											value={userGroups}
											//input={<Input />}
											onChange={onMultiSelect}>
										{allGroups.map((grp: string, idx: number) => (
											<MenuItem key={idx} value={grp}>
												{grp}
											</MenuItem>
										))}
									</Select>
								</div>
								<div style={{ float: 'right', width: '55%' }}>
									<InputLabel id="client-box">Clients:</InputLabel>
									<Select name="clientIds"
											labelId="client-box"
											multiple
											autoWidth
											value={clientIds}
											//input={<Input />}
											onChange={onMultiSelect}>
										{allClients.map((cli: any, idx: number) => (
											<MenuItem key={idx} value={cli.id}>
												{cli.full_name}
											</MenuItem>
										))}
									</Select>
								</div>
							</div>

							<br /><br /><br />

							<label>
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
									Add New Image
								</Button>

								{userAtts.profile_img && userAtts.profile_img.name
									? (<span><br /><br />New:&nbsp;{userAtts.profile_img.name}<br /></span>)
									: null
								}
							</label>

							<br /><br />

							<div className={classes.submit}>
								<Button variant="contained"
									color="primary"
									onClick={onSubmit}>
									Edit User
								</Button>
							</div>
						</form>
					)
				}
			</Collapse>

		</div>
	);
};


export default EditUser;