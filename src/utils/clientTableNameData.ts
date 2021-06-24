let filePath: string = '../../amplify/backend/api/trueeventsplatform/schema/Client.graphql';


/*const clientTableNames_OLD: any[] = [
	{ name: 'Events' },
	{ name: 'Sessions' },
	{ name: 'Presenters' },
	{ name: 'Tables' },
	{ name: 'Halls' },
	{ name: 'Stages' }
];*/


const clientTableNames: any = () => {
	const rtn: string[] = [
		'Event',
		'Session',
		'Presenter',
		'Table',
		'Hall',
		'Stage',
		'PresenterSocialMedia',
		'User',
		'UserEventGroup',
		'UserEventJoin',
		'TrueChatRoom',
		'TrueChatMessage'
	];
	return rtn;
};


const readFile1: any = () => {
	let file: string = 'file://home/wendell/projects/trueevents-platform-amplify/amplify/backend/api/trueeventsplatform/schema/Client.graphql';
	const rawFile: any = new XMLHttpRequest();
	rawFile.open('GET', file, false);

	/*
	/home/wendell/projects/trueevents-platform-amplify/amplify/backend/api/trueeventsplatform/schema/Client.graphql
	*/

	rawFile.onreadystatechange = () => {
		if( rawFile.readyState === 4 ){
			if( rawFile.status === 200 || rawFile.status == 0 ){
				let text: string = rawFile.responseText;
				console.log('readFile1:', text);
				//console.log('__dirname:', __dirname);
			}
		}
	};

	rawFile.send(null);
};


const readFile2: any = () => {

	fetch(filePath, {mode: 'no-cors'})
	/*fetch(filePath, {
		headers : {
			'Content-Type': 'application/graphql',
			'Accept': 'application/graphql'
		}
	})*/
		.then((response: any) => {
			let blarg: any = response.text();
			console.log('response*:', response);
			console.log('text()*:', blarg);
		})
		.then((data: any) => {
			console.log('data*:', data);
		})
		/*.catch((err: any) => {
			console.error('err*:', err);
		})*/
	;
};


export {
	clientTableNames
	//readFile1,
	//readFile2
};