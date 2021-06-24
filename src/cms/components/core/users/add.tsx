import { useState, useEffect } from 'react';
import {
	adminEnableUser,
	adminDisableUser,
	listGroups,
	adminCreateUser,
	adminAddUserToGroup
} from '../../../../utils/cognitoService';
import history from '../../../../utils/history';
import {
	InputLabel,
	Collapse,
	MenuItem,
	TextField,
	Button,
	Select
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import titles from '../../../../utils/titlesData';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import userStatus from '../../../../utils/userStatusData';
import { putStorage } from '../../../../utils/awsStorage';
import { listClients } from '../../../../graphql/queries';
import { createUserClientJoin, updateClient } from '../../../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
//import { v4 as uuid } from 'uuid';
import generator from 'generate-password';
import { isEmailValid } from '../../../../utils/isEmailTools';


interface Props {};


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


const newPwd: string = generator.generate({
	length: 8,
	numbers: true,
	symbols: true,
	lowercase: true,
	uppercase: true
});


const AddUser: any = (props: Props) => {

	let { id }: any = useParams();
	const [hideDiv, setHideDiv]: any = useState(id ? true : false);
	const [userBasics, setUserBasics]: any = useState({
		user_name: '',
		email: '',
		email_verified: false,
		enabled: true,
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
	const [showSubmit, setShowSubmit]: any = useState(false);
	const [allClients, setAllClients]: any = useState([]);
	const [userGroups, setUserGroups]: any = useState(['Guest']);
	const [allGroups, setAllGroups]: any = useState([]);
	const classes: any = useStyles();

	const onBasicChange: any = (evt: any) => {
		let name: string = evt.target.name;
		let value: string = evt.target.value;
		updateUserBasics(name, value);
		switch( name ){
			case 'email':
				setShowSubmit(
					isEmailValid(value) ? true : false
				);
			break;
		}
	};

	const updateUserBasics: any = (key: string, value: string) => setUserBasics({...userBasics, [key]: value});

	const onAttChange: any = (evt: any) => updateUserAtts(evt.target.name, evt.target.value);
	const updateUserAtts: any = (key: string, value: string) => setUserAtts({...userAtts, [key]: value});

	const onSubmit: any = async (evt: any) => {
		evt.preventDefault();
		try{
			let imgName: string = await updateImg();
			let userName: string = await createUser(imgName);
			ableUser(userName);
			updateGroups(userName);
			updateClients(userName);
			history.push('/cms/core/users/?action=created');
		}catch( err: any ){
			//console.log('err:', err);
			history.push('/cms/core/users/?action=error');
		}
	};

	const createUser: any = async (imgName: string) => {
		imgName = (imgName || userAtts.profile_img);

		const newUserAtts: any[] = [
			{ Name: 'email', Value: userBasics.email },
			{ Name: 'email_verified', Value: `${userBasics.email_verified}` },	// added quotes; value must be a string
			{ Name: 'custom:title', Value: userAtts.title },
			{ Name: 'custom:first_name', Value: userAtts.first_name },
			{ Name: 'custom:last_name', Value: userAtts.last_name },
			{ Name: 'custom:job_title', Value: userAtts.job_title },
			{ Name: 'custom:profile_img', Value: imgName }
		];

		const createAtts: any = {
			UserAttributes: newUserAtts,
			TemporaryPassword: newPwd,
			DesiredDeliveryMediums: ['EMAIL'],
			ValidationData: [],
			ForceAliasCreation: false,
			MessageAction: 'SUPPRESS'
		};

		const result: any = await adminCreateUser(userBasics.email, createAtts);
		//console.log('result:', result);
		return result.User.Username;	// should be uuid
	};

	const updateImg: any = async (id: string) => {
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

	const updateGroups: any = (userName: string) => adminAddUserToGroup(userName, userGroups);

	const ableUser: any = (userName: string) => {
		switch( userBasics.enabled ){
			case 'true':
				adminEnableUser(userName);
			break;
			default:
				adminDisableUser(userName);
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

	const updateClients: any = (userName: string) => {
		/* start: add new joins */
		clientIds.map((cId: string) => {
			const params: any = {
				input: {
					cognito_sub: userName,
					userClientJoinClientId: cId
				}
			};
			API.graphql(graphqlOperation( createUserClientJoin, params ));
		});
		/* end: add new joins */
	};

	/*const updateClients_OLD: any = async (userName: string) => {
		try{
			const result: any = await API.graphql(graphqlOperation(
				createUserClientJoin,
				{input: {cognito_sub: userName}}
			));
			//console.log('result:', result);
			let joinId: string = result.data.createUserClientJoin.id;

			clientIds.map((clientId: string) => {
				API.graphql(graphqlOperation(
					updateClient,
					{input: {id: clientId, join_id: joinId}}
				));
			});
		}catch( err: any ){
			console.log('createUserClientJoin err:', err);
		}
	};*/

	useEffect(() => {
		getAllGroups();
		getAllClients();
	}, []);

	return(
		<div>

			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				Add User
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
							<TextField name="email" label="Email:" value={userBasics.email} onChange={onBasicChange} required />
							<TextField name="email_verified"
									select
									label="Email Verified:"
									value={userBasics.email_verified}
									//helperText="Verify your email"
									onChange={onBasicChange}>
								{['true', 'false'].map((bln: any, idx: number) => (
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

							<br /><br /><br /><br />

							<label>
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

							{showSubmit
								? (
									<div className={classes.submit}>
										<Button variant="contained"
											color="primary"
											onClick={onSubmit}>
											Add User
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


export default AddUser;