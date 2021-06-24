//import { listUsers } from '../graphql/queries';
//import { API, graphqlOperation } from 'aws-amplify';
import { adminGetUser } from './cognitoService';


//let pattern: string = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let pattern: any = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;


const isEmailValid: any = (email: string) => {
	email = email.trim();
	//let rtnBln = email.match(pattern);
	let rtnBln: boolean = pattern.test(email);	// returns boolean
	return rtnBln;	// returns boolean
};


const isEmailTaken: any = (email: string) => {
	email = email.trim();
	let rtnBln: boolean = false;

	adminGetUser('???')
		.then((data: any) => {
			console.log('data:', data);
		});

	return rtnBln;
};


/*const isEmailTaken_OLD: any = async (email: string) => {
	email = email.trim();
	let rtnBln: boolean = false;

	const result: any = await API.graphql(graphqlOperation(
		listUsers,
		{filter: {email: {eq: email}}}
	));

	if( result.data.listUsers.items.length ){
		rtnBln = true;
	}

	return rtnBln;
};*/


export {
	isEmailValid,
	isEmailTaken
};