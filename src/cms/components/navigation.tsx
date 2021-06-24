import { useEffect, useState } from 'react';
import { currentAuthenticatedUser, currentUserInfo } from '../../utils/amplifyAuth';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import CoreNavLinks from './coreNavLinks';
import ClientNavLinks from './clientNavLinks';
import { listSettings } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { setAllLocalStorage, populateCache } from '../../stores/localStorage';
import {
	userIdVar,
	userFirstNameVar,
	userLastNameVar,
	userEmailVar,
	userRolesVar,
	clientIdVar,
	clientFullNameVar,
	clientFriendlyNameVar,
	eventIdVar,
	eventNameVar
} from '../../stores/cache';
import history from '../../utils/history';
import SelectClient from './selectClient';
import SelectEvent from './selectEvent';
import { getLocalStorage } from '../../stores/localStorage';
import { addEventJoins } from '../../utils/addEventJoins';


interface Props {};


const Navigation: any = (props: Props) => {

	let ls_clientId: string = getLocalStorage('clientId');
	let ls_eventId: string = getLocalStorage('eventId');
	let ls_firstName: string = getLocalStorage('userFirstName');
	let ls_email: string = getLocalStorage('userEmail');

	const [clientId, setClientId]: any = useState(ls_clientId);
	const [eventId, setEventId]: any = useState(ls_eventId);
	const [firstName, setFirstName]: any = useState(ls_firstName);
	const [email, setEmail]: any = useState(ls_email);
	const [groups, setGroups]: any = useState(['Guest']);
	const [signOutText, setSignOutText]: any = useState('Sign Out');

	const getUser: any = () => {
		currentUserInfo()
			.then((result: any) => {
				//console.log('getUser:', result);
				const atts: any = (result.attributes || {});
				if( atts['sub'] ){
					userIdVar(atts['sub']);
				}
				if( atts['email'] ){
					userEmailVar(atts['email']);
					setEmail(atts['email']);
				}
				if( atts['custom:first_name'] ){
					userFirstNameVar(atts['custom:first_name']);
					setFirstName(atts['custom:first_name']);
				}
				if( atts['custom:last_name'] ){
					userLastNameVar(atts['custom:last_name']);
				}
			});
	};

	const getGroups: any = () => {
		currentAuthenticatedUser()
			.then((result: any) => {
				//console.log('result:', result);
				try{
					const groups: string[] = (result.signInUserSession.accessToken.payload['cognito:groups'] || []);
					userRolesVar(groups);
					setGroups(groups);
				}catch (err: any ){}
			});
	};

	const onSelectChange: any = (evt: any) => {
		evt.preventDefault();
		let name: string = evt.target.name;
		let value: string = evt.target.value;

		//console.log('name:', name);
		//console.log('value:', value);

		switch( name ){

			case 'clientId':
				if( value ){	// to handle 'Select' option
					setClientId(value);
					clientIdVar(value);
					clientFullNameVar(evt.currentTarget.dataset.fullname);
					clientFriendlyNameVar(evt.currentTarget.dataset.friendlyname);
					addEventJoins(value);
				}else{
					setClientId('');
					clientIdVar('');
					clientFullNameVar('');
					clientFriendlyNameVar('');
				}
				setEventId('');
				eventIdVar('');
				eventNameVar('');
			break;

			case 'eventId':
				if( value ){
					setEventId(value);
					eventIdVar(value);
					eventNameVar(evt.currentTarget.dataset.eventname);
				}else{
					setEventId('');
					eventIdVar('');
					eventNameVar('');
				}
			break;

		}

		setAllLocalStorage();
		history.push('/');
	};

	const getSettings: any = async () => {
		let btnText: string = 'sign_out_btn_text';

		const params : any = {
			filter: {setting: {eq: btnText}}
		};

		const result: any = await API.graphql(graphqlOperation( listSettings, params ));
		const settings: any[] = (result.data.listSettings.items || []);

		//console.log('settings:', settings);

		settings.map((row: any) => {
			switch( row.setting ){
				case btnText:
					setSignOutText(row.value);
				break;
			}
		});
	};

	const doAsyncs: any = async () => {
		if( clientId ){ await addEventJoins(clientId); }
	};

	useEffect(() => {
		doAsyncs();
		getUser();
		getGroups();
		getSettings();
		populateCache();
	}, []);

	return (
		<div>
			Logged in as: {(firstName || email)}

			{groups.indexOf('SuperAdmin') > -1
				? (<div><CoreNavLinks {...props} /></div>)
				: null
			}

			<SelectClient clientId={clientId} onChange={onSelectChange} />

			{clientId
				? (
					<div>
						<SelectEvent clientId={clientId} eventId={eventId} onChange={onSelectChange} />
						<br /><ClientNavLinks {...props} />
					</div>
				)
				: null
			}

			<br /><AmplifySignOut buttonText={signOutText} />
		</div>
	);

};


export default Navigation;