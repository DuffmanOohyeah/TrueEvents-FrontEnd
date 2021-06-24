import AWS from 'aws-sdk';
import rolesData from './rolesData';
/*import {
	currentAuthenticatedUser,
	currentCredentials
} from './amplifyAuth';*/


const getParams: any = () => {
	// TODO: read these params from env vars
	const params: any = {
		apiVersion: process.env.REACT_APP_API_VERSION,
		region: process.env.REACT_APP_AWS_REGION,
		accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
		secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
		//sessionToken: process.env.REACT_APP_SESSION_TOKEN,
		userPoolId: process.env.REACT_APP_USER_POOL_ID
	};

	/*const authUser: any = await currentAuthenticatedUser();
	if( authUser.pool.userPoolId ){
		params['userPoolId'] = authUser.pool.userPoolId;
	}

	const authCreds: any = await currentCredentials();
	if( authCreds ){
		params['accessKeyId'] = authCreds.accessKeyId;
		params['secretAccessKey'] = authCreds.secretAccessKey;
		params['sessionToken'] = authCreds.sessionToken
	}*/

	//console.log('params:', params);
	return params;
};


const getProvider: any = async () => {
	const authParams: any = await getParams();
	const provider: any = await new AWS.CognitoIdentityServiceProvider(authParams);
	return provider;
};


const listUserPools: any = async () => {
	let rtn: any = {};
	try{
		const params: any = {
			MaxResults: 10
		};
		const provider: any = await getProvider();
		const result: any = provider
			.listUserPools(params)
			.promise();
		if( result ){
			rtn = result;
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const listUsers: any = async (filter: string = '', limit: number = 60) => {
	//createGroup();	// TODO: only want to run once per app load; need to think about location (scheduler maybe?)
	let rtn: any = {};
	//console.log('filter:', filter);
	try{
		const authParams: any = await getParams();

		const params: any = {
			UserPoolId: authParams.userPoolId,
			AttributesToGet: null, // or string[]
			Filter: filter,
			Limit: limit
			//PaginationToken: ''
		};

		const provider: any = await getProvider();

		const result: any = provider
			.listUsers(params)
			.promise();
		if( result ){
			rtn = result;
		}
	}catch( err: any ){
		//console.log('err:', err);
	}

	return rtn;
};


const adminGetUser: any = async (userName: string) => {
	let rtn: any = {};
	try{
		const authParams: any = await getParams();
		const params: any = {
			UserPoolId: authParams.userPoolId,
			Username: userName
		};
		const provider: any = await getProvider();
		const result: any = provider
			.adminGetUser(params)
			.promise();
		if( result ){
			rtn = result;
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const adminUpdateUserAttributes: any = async (userName: string, userAtts: any[]) => {
	let rtn: any = {};
	try{
		const authParams: any = await getParams();
		const params: any = {
			UserPoolId: authParams.userPoolId,
			Username: userName,
			UserAttributes: userAtts	// array
		};
		const provider: any = await getProvider();
		const result: any = await provider
			.adminUpdateUserAttributes(params)
			.promise();
		if( result ){
			rtn = result;
			//console.log('adminUpdateUserAtts:', result);
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const adminCreateUser: any = async (userName: string, createAtts: any) => {
	let rtn: any = {};
	try{
		const authParams: any = await getParams();
		const params: any = createAtts;
			params['UserPoolId'] = authParams.userPoolId;
			params['Username'] = userName;
		const provider: any = await getProvider();
		const result: any = provider
			.adminCreateUser(params)
			.promise();
		if( result ){
			rtn = result;
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const adminSetUserPassword: any = async (pwdAtts: any) => {
	let rtn: any = {};
	try{
		const authParams: any = await getParams();
		const params: any = pwdAtts;
			params['UserPoolId'] = authParams.userPoolId;
		const provider: any = await getProvider();
		const result: any = provider
			.adminSetUserPassword(params)
			.promise();
		//console.log('adminSetUserPassword:', result);
		if( result ){
			rtn = result;
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const adminDisableUser: any = async (userName: string) => {
	let rtn = {};
	try{
		const authParams: any = await getParams();
		const params: any = {
			UserPoolId: authParams.userPoolId,
			Username: userName
		};
		const provider: any = await getProvider();
		const result: any = provider
			.adminDisableUser(params)
			.promise();
		if( result ){
			rtn = result;
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const adminEnableUser: any = async (userName: string) => {
	let rtn: any = {};
	try{
		const authParams: any = await getParams();
		const params: any = {
			UserPoolId: authParams.userPoolId,
			Username: userName
		};
		const provider: any = await getProvider();
		const result: any = provider
			.adminEnableUser(params)
			.promise();
		if( result ){
			rtn = result;
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const adminDeleteUser: any = async (userName: string) => {
	let rtn: any = {};
	try{
		const authParams: any = await getParams();
		const params: any = {
			UserPoolId: authParams.userPoolId,
			Username: userName
		};
		const provider: any = await getProvider();
		const result: any = provider
			.adminDeleteUser(params)
			.promise();
		if( result ){
			rtn = result;
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const listGroups: any = async () => {
	let rtn: any = {};
	try{
		const authParams: any = await getParams();
		const params: any = {
			UserPoolId: authParams.userPoolId
		};
		const provider: any = await getProvider();
		const result: any = provider
			.listGroups(params)
			.promise();
		if( result ){
			rtn = result;
		}
		//console.log('result:', result);
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const adminListGroupsForUser: any = async (userName: string) => {
	let rtn: any = {};
	try{
		const authParams: any = await getParams();
		const params: any = {
			UserPoolId: authParams.userPoolId,
			Username: userName
			// Limit: 1
		};
		const provider: any = await getProvider();
		const result: any = provider
			.adminListGroupsForUser(params)
			.promise();
		if( result ){
			rtn = result;
			//console.log('result:', result);
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const adminAddUserToGroup: any = async (userName: string, groups: string[] = []) => {
	let rtn: any = {};
	await adminRemoveUserFromGroup(userName);
	try{
		if( groups.length ){
			const authParams: any = await getParams();
			const params: any = {
				UserPoolId: authParams.userPoolId,
				Username: userName
			};
			const provider: any = await getProvider();
			for( let idx: number = 0; idx < groups.length; idx++ ){
				//console.log('group name:', groups[idx]);
				params['GroupName'] = groups[idx];
				const result: any = provider
					.adminAddUserToGroup(params)
					.promise();
				if( result ){
					rtn = result;
					//console.log('result:', result);
				}
			};
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const createGroup: any = async () => {
	let rtn: any = {};
	try{
		  const missingGroups: any[] = [];
		  let precedence: number = rolesData.length;
		  const authParams: any = await getParams();

		  for( let idx: number = 0; idx < rolesData.length; idx++ ){
			let name: string = rolesData[idx].role;
			await getGroup(name)
				.then((data: any) => {
					if( !data.Group ){
						missingGroups.push({name: name, precedence: precedence});
						//console.log('getGroup data:', data);
					}
				});
			precedence--;
		  }

		  const params: any = {
			UserPoolId: authParams.userPoolId
			//RoleArn: 'STRING_VALUE'
		  };
		  const provider: any = await getProvider();

		  for( let idx2: number = 0; idx2 < missingGroups.length; idx2++ ){
			const mgObj: any = missingGroups[idx2];
			params['GroupName'] = mgObj.name;
			params['Description'] = `Group (${mgObj.name}) automatically added via application.`;
			params['Precedence'] = mgObj.precedence;
			const result: any = provider
				.createGroup(params)
				.promise();
			if( result ){
				rtn = result;
				//console.log('result:', result);
			}
		  }

		  //console.log('missingGroups:', missingGroups);

	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const getGroup: any = async (groupName: string) => {
	let rtn: any = {};
	try{
		const authParams: any = await getParams();
		const params: any = {
			UserPoolId: authParams.userPoolId,
			GroupName: groupName
		};
		const provider: any = await getProvider();
		const result: any = provider
			.promise();
		if( result ){
			rtn = result;
			//console.log('result:', result);
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const adminRemoveUserFromGroup: any = async (userName: string) => {
	let rtn: any = {};
	try{
		const authParams: any = getParams();
		const params: any = {
			UserPoolId: authParams.userPoolId,
			Username: userName
		};
		const provider: any = await getProvider();
		for( let idx: number = 0; idx < rolesData.length; idx++ ){
			let grpName: string = rolesData[idx].role;
			params['GroupName'] = grpName;

			if( grpName !== 'SuperAdmin' ){
				const result: any = provider
					.adminRemoveUserFromGroup(params)
					.promise();
				if( result ){ rtn = result; }
			}
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const addCustomAttributes: any = async (names: string[] = []) => {
	let rtn: any = {};
	try{
		const authParams: any = getParams();
		const customAtts: any[] = [];

		for( let idx: number = 0; idx < names.length; idx++ ){
			customAtts.push({
				AttributeDataType: 'String',
				DeveloperOnlyAttribute: false,
				Mutable: true,
				Name: names[idx],
				Required: false
			});
		}

		const params: any = {
			UserPoolId: authParams.userPoolId,
			CustomAttributes: customAtts
		};
		const provider: any = await getProvider();
		const result: any = await provider
			.addCustomAttributes(params)
			.promise();
		if( result ){
			rtn = result;
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const adminDeleteUserAttributes: any = async (userName: string = '', userAtts: any[] = []) => {
	let rtn: any = {};
	try{
		if( userName.length && userAtts.length ){
			const authParams: any = getParams();
			const params: any = {
				UserPoolId: authParams.userPoolId,
				Username: userName,
				UserAttributeNames: userAtts
			};
			const provider: any = await getProvider();
			const result: any = await provider
				.adminDeleteUserAttributes(params)
				.promise();
			if( result ){
				rtn = result;
				//console.log('result:', result);
			}
		}
	}catch( err: any ) {
		//console.log('err:', err);
	}
	return rtn;
};


export {
	getParams,
	getProvider,
	listUserPools,
	listUsers,
	adminGetUser,
	adminUpdateUserAttributes,
	adminCreateUser,
	adminSetUserPassword,
	adminDisableUser,
	adminEnableUser,
	adminDeleteUser,
	listGroups,
	adminListGroupsForUser,
	adminAddUserToGroup,
	createGroup,
	getGroup,
	adminRemoveUserFromGroup,
	addCustomAttributes,
	adminDeleteUserAttributes
};