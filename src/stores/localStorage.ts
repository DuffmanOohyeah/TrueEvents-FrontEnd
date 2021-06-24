import {
	userIdVar,
	userEmailVar,
	userFirstNameVar,
	userLastNameVar,
	userClientIdsVar,
	userRolesVar,
	clientIdVar,
	clientFullNameVar,
	clientFriendlyNameVar,
	eventIdVar,
	eventNameVar
} from './cache';


const setAllLocalStorage: any = () => {
	if( userIdVar() ){	// set if logged in
		localStorage.setItem('userId', userIdVar());
		localStorage.setItem('userEmail', userEmailVar());
		localStorage.setItem('userFirstName', userFirstNameVar());
		localStorage.setItem('userLastName', userLastNameVar());
		localStorage.setItem('userClientIds', userClientIdsVar());
		localStorage.setItem('userRoles', userRolesVar());
		localStorage.setItem('clientId', clientIdVar());
		localStorage.setItem('clientFullName', clientFullNameVar());
		localStorage.setItem('clientFriendlyName', clientFriendlyNameVar());
		localStorage.setItem('eventId', eventIdVar());
		localStorage.setItem('eventName', eventNameVar());
	}
};


const clearLocalStorage: any = () => {
	localStorage.clear();
};


const getLocalStorage: any = (key: string) => {
	return localStorage.getItem(key);
};


const removeLocalStorage: any = (key: string) => {
	localStorage.removeItem(key);
};


const populateCache: any = () => {
	if( !userIdVar() && getLocalStorage('userId') ){
		userIdVar(getLocalStorage('userId'));
		userEmailVar(getLocalStorage('userEmail'));
		userFirstNameVar(getLocalStorage('userFirstName'));
		userLastNameVar(getLocalStorage('userLastName'));

		let client_ids: string = getLocalStorage('userClientIds');
		if( client_ids ){
			userClientIdsVar(client_ids.split(','));
		}
		let roles: string = getLocalStorage('userRoles');
		if( roles ){
			userRolesVar(roles.split(','));
		}

		clientIdVar(getLocalStorage('clientId'));
		clientFullNameVar(getLocalStorage('clientFullName'));
		clientFriendlyNameVar(getLocalStorage('clientFriendlyName'));

		eventIdVar(getLocalStorage('eventId'));
		eventNameVar(getLocalStorage('eventName'));

		//console.log('client_ids:', client_ids);
		//console.log('roles:', roles);
	}
};


export {
	setAllLocalStorage,
	clearLocalStorage,
	getLocalStorage,
	removeLocalStorage,
	populateCache
};