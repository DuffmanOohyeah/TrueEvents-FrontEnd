import AWS from 'aws-sdk';
//import { v4 as uuid } from 'uuid';
import { clientTableNames } from './clientTableNameData';
import { transposeNodeEnv } from './transposeNodeEnv';


const getParams: any = () => {
	const params: any = {
		apiVersion: process.env.REACT_APP_API_VERSION,
		region: process.env.REACT_APP_AWS_REGION,
		accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
		secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
		//sessionToken: process.env.REACT_APP_SESSION_TOKEN
	};
	return params;
};


const setCredentials: any = () => {
	const authParams: any = getParams();
	new AWS.Credentials(authParams);
	//return null;
};


const setConfig: any = () => {
	const authParams: any = getParams();
	new AWS.Config(authParams);
	//return null;
};


const getProvider: any = () => {
	//setCredentials();
	//setConfig();
	const authParams: any = getParams();
	const provider: any = new AWS.DynamoDB(authParams);
	return provider;
};


const listTables: any = async (clientsOnly: boolean = true) => {
	const rtn: any[] = [];
	try{
		const provider: any = getProvider();
		const result: any = await provider
			.listTables()
			.promise();

		//clientTableNames();
		const tblNameArr: string[] = clientTableNames();
		//console.log('tblNameArr:', tblNameArr);
		//console.log('listTables:', result);

		if( result ){

			if( clientsOnly ){
				result.TableNames.map((name: string) => {

					const tmpArr: string[] = name.split('-');
					let prefix: string = tmpArr[0];
					let suffix: string = tmpArr[tmpArr.length - 1];

					//console.log('prefix:', prefix);
					//console.log('suffix:', suffix);
					//console.log('transposeNodeEnv:', transposeNodeEnv());

					if( suffix == transposeNodeEnv() ){
						if( tblNameArr.indexOf(prefix) > -1 ){
							//console.log('name:', name);
							//console.log('prefix:', prefix);
							//console.log('suffix:', suffix);
							rtn.push({
								abbr: prefix,
								full: name
							});
						}
					}

					/*if( name.indexOf('Client') == 0 ){
						let abbr: string = name.replace(/Client/, '');
							abbr = abbr.substring(0, abbr.indexOf('-'));
						rtn.push({
							abbr: abbr,
							full: name
						});
					}*/
				});

				//console.log('rtn:', rtn);

			}else{
				result.TableNames.map((name: string) => {
					let abbr: string = name;
					if( abbr.indexOf('Client') == 0 ){
						abbr = abbr.replace(/Client/, '');
					}
					abbr = abbr.substring(0, abbr.indexOf('-'));
					rtn.push({
						abbr: abbr,
						full: name
					});
				});

				//rtn.push(name);
			}

			//console.log('result:', result);
		}
	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const createClientTables: any = async (name: string) => {
	let rtn: any = {};
	try{
		// TODO: maybe read the individual table schemas from a yaml file?

		const provider: any = getProvider();

		/* start: prep the new db name */
		let tblPrefix: string = name;
			tblPrefix = tblPrefix.replace(/Client/, '');
			tblPrefix = tblPrefix.replace(/ /g, '');	// lose spaces
			tblPrefix = tblPrefix.replace(/-/g, '');	// lose hyphens
			tblPrefix = tblPrefix.replace(/_/g, '');	// lose underscores
			tblPrefix = `Client${tblPrefix}`;
		/* end: prep the new db name */

		/* start: loop & create the new client tables */
		for( let idx: number = 0; idx < clientTableNames.length; idx++ ){
			const obj: any = clientTableNames[idx];
			let cliTbl: string = tblPrefix + obj.name;
			const descTbl: any = await describeTable(cliTbl);

			if( !descTbl.Table ){

				const params: any = {
					TableName: cliTbl,
					AttributeDefinitions: [
						{ AttributeName: 'id', AttributeType: 'S' }
					],
					KeySchema: [
						{ AttributeName: 'id', KeyType: 'HASH' }
					],
					ProvisionedThroughput: {
						ReadCapacityUnits: 5,
						WriteCapacityUnits: 5
					}
				};

				await provider
					.createTable(params)
					.promise();

			}
		};
		/* end: loop & create the new client tables */

	}catch( err: any ){
		console.log('err:', err);
	}
	return rtn;
};


const describeTable: any = async (name: string) => {
	let rtn: any = {};
	try{

		/*if( name.indexOf('Core') == -1 ){
			name = 'Client' + name;
		}*/

		const provider: any = getProvider();

		/* start: experimental
		const blarg = await provider
			.listTables({ ExclusiveStartTableName: name })
			.promise();
		console.log('blarg:', blarg);
		end: experimental */

		const params: any = {
			TableName: name
		};

		const result: any = await provider
			.describeTable(params)
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


const listClientTablesGrouped: any = async () => {
	const rtn: any[] = [];
	try{
		const list: any = await listTables(true);

		const reduceObj: any = list.reduce((obj: any, name: string) => {
			let abbr: string = name.replace(/Client/, '');
				abbr = abbr.substring(0, abbr.indexOf('-'));
			obj[abbr] = (obj[abbr] || []);
			obj[abbr].push(name);
			return obj;
		}, Object.create(null));

		Object.entries(reduceObj).map(obj => {
			rtn.push(obj);
		});

	}catch( err: any ){
		//console.log('err:', err);
	}
	return rtn;
};


const updateTable: any = async (tblName: string, readUnits: number = 5, writeUnits: number = 5) => {
	let rtn: any = {};
	try{
		const params: any = {
			TableName: tblName,
			ProvisionedThroughput: {
				ReadCapacityUnits: readUnits,
				WriteCapacityUnits: writeUnits
			}
		};
		const provider: any = getProvider();
		const result: any = await provider
			.updateTable(params)
			.promise();
		if( result ){
			rtn = result;
			//console.log('result:', result);
		}
	}catch( err: any ){
		console.log('err:', err);
	}
	return rtn;
};


const createTable: any = async () => {
	let rtn: any = {};
	try{

	}catch( err: any ){
		console.log('err:', err);
	}
	return rtn;
};


export {
	getParams,
	setCredentials,
	listTables,
	getProvider,
	setConfig,
	createClientTables,
	describeTable,
	listClientTablesGrouped,
	updateTable,
	createTable
};