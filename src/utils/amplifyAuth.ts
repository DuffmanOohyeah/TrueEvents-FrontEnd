import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listClients } from '../graphql/queries';


const currentCredentials: any = async () => {
	let rtn = {};
	try{

		const cCreds = await Auth.currentCredentials();
		const eCreds = await Auth.essentialCredentials(cCreds); // Compact version of credentials
		if( eCreds ){
			rtn = eCreds;
		}

		console.log('cCreds:', cCreds);
		console.log('eCreds:', eCreds);

		 /*await Auth
			.currentCredentials()
			.then(credentials => {
				const eCreds = Auth.essentialCredentials(credentials);
				rtn = eCreds;
			});*/
	}catch( err ){
		//console.log('err:', err);
	}
	return rtn;
};


const currentAuthenticatedUser: any = async () => {
	let rtn = {};
	try{
		const result = await Auth.currentAuthenticatedUser();
		if( result ){
			rtn = result;
			//console.log('currentAuthenticatedUser:', result);
		}
	}catch( err ){
		//console.log('err:', err);
	}
	return rtn;
};


const currentUserInfo: any = async () => {
	let rtn = {};
	try{
		const result = await Auth.currentUserInfo();
		if( result ){
			rtn = result;
			//console.log('currentUserInfo:', result);
		}
	}catch( err ){
		//console.log('err:', err);
	}
	return rtn;
};


/*const getCognitoSub: any = () => {
	const user: any = currentUserInfo();
	console.log('user:', user);

};*/


const getUserClients: any = async () => {
	const rtn: any[] = [];
	try{
		const uInfo = await Auth.currentUserInfo();
		//console.log('currentUserInfo:', uInfo);
		if( uInfo.attributes ){
			for( const [key, value] of Object.entries(uInfo.attributes) ){
				if( key.match(/custom:client_id/i) ){

					const coreClient: any = await API.graphql(graphqlOperation(
						listClients,
						{ filter: { id: { eq: value } } }
					));
					//console.log('coreClient:', coreClient);

					if( coreClient.data.listClients.items[0].full_name ){
						rtn.push({
							id: value,
							fullName: coreClient.data.listClients.items[0].full_name,
							friendlyName: coreClient.data.listClients.items[0].friendly_name
						});
					}
				}
				//console.log(`${key}: ${value}`);
			}
		}
	}catch( err ){
		//console.log('err:', err);
	}
	return rtn;
};


export {
	currentCredentials,
	currentAuthenticatedUser,
	currentUserInfo,
	getUserClients
	//getCognitoSub
};