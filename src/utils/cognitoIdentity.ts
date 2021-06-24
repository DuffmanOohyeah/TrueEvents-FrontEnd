import AWS, { CognitoIdentity } from 'aws-sdk';


const getParams: any = () => {
	// TODO: read these params from env vars
	let region: string = (process.env.REACT_APP_AWS_REGION || '');
	const params: any = {
		region: region,
		identityPoolId: `${region}:${process.env.REACT_APP_IDENTITY_POOL_ID}`,
		accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
		secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
		//sessionToken: process.env.REACT_APP_SESSION_TOKEN
	};
	//console.log('params:', params);
	return params;
};


 const getCredentials: any = () => {
	const params: any = getParams();
	const credentials: any = new AWS.Credentials({
		accessKeyId: params.accessKeyId,
		secretAccessKey: params.secretAccessKey,
		sessionToken: params.sessionToken
	});
	//console.log('credentials:', credentials);
	return credentials;
};


const initCreds: any = () => {
	const params: any = getParams();
	// Initialize the Amazon Cognito credentials provider
	//AWS.config.region = params.region;
	AWS.config.update({ region: params.region });
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: params.identityPoolId
	});
	return null;
};


const getCognitoId: any = () => {
	const params: any = getParams();
	const cognitoId: any = new AWS.CognitoIdentity({
		apiVersion: process.env.REACT_APP_API_VERSION,
		region: params.region,
		accessKeyId: params.accessKeyId,
		secretAccessKey: params.secretAccessKey,
		sessionToken: params.sessionToken
	});
	//console.log('cognitoId:', cognitoId);
	return cognitoId;
};


const listIds: any = async () => {
	let rtn: any = {};
	try{
		const params: any = {
			IdentityPoolId: getParams().identityPoolId, /* required */
			MaxResults: 10, /* required */
			HideDisabled: false
			//NextToken: ''
		};
		const result: any = await getCognitoId().listIdentities(params).promise();
		//console.log('result:', result);
		if( result ){
			rtn = result;
		}
	}catch( err: any ){
		rtn = err;
	}
	return rtn;
};


const listIdPools: any = async () => {
	let rtn: any = {};
	try{
		const params: any = {
			MaxResults: 10
		};
		const result: any = await getCognitoId().listIdentityPools(params).promise();
		if( result ){
			rtn = result;
		}
	}catch( err: any ){
		rtn = err;
	}
	return rtn;
};


const descIdPool: any = async () => {
	let rtn: any = {};
	try{
		const params: any = {
			IdentityPoolId: getParams().identityPoolId
		};
		const result: any = await getCognitoId().describeIdentityPool(params).promise();
		if( result ){
			rtn = result;
		}
	}catch( err: any ){
		rtn = err;
	}
	return rtn;
};


export {
	getParams,
	getCredentials,
	initCreds,
	getCognitoId,
	listIds,
	listIdPools,
	descIdPool
};