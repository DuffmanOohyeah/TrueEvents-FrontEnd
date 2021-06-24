import { Storage } from 'aws-amplify';
import { clientIdVar, userIdVar } from '../stores/cache';


const getFilePath: any = (category: string, categoryId: string) => {
	let path: string = '';
	let id: string = categoryId;

	switch( category ){
		case 'client':
		case 'clients':
			id = (categoryId || clientIdVar());
			if( id ){
				path += `clients/${id}/`;
			}
		break;
		case 'event':
		case 'events':
			if( id ){
				path += `events/${id}/`;
			}
		break;
		case 'presenter':
		case 'presenters':
			if( id ){
				path += `presenters/${id}/`;
			}
		break;
		case 'user':
		case 'users':
			id = (categoryId || userIdVar());
			if( id ){
				path += `users/${id}/`;
			}
		break;
		case 'table':
		case 'tables':
			if( id ){
				path += `tables/${id}/`;
			}
		break;
	}

	return path;
};


const putStorage: any = async (fileObj: any, category: string, categoryId: string = '', level: string = 'public') => {
	const rtn: any = {
		data: {},
		success: false,
		err: ''
	};

	try{
		const args: any = {
			level: level
		};

		let name: string = getFilePath(category, categoryId) + fileObj.name;
		let type: string = (fileObj.type || '');

		if( type ){
			args['contentType'] = type;
		}

		const result: any = await Storage.put(name, fileObj, args);	// returns obj like: {key: 'file.txt'}
		//console.log('put:', result);
		//console.log('fileObj:', fileObj);
		//console.log('args:', args);
		//console.log('getFilePath:', getFilePath(category));

		if( result ){
			rtn['data'] = result;
			rtn['success'] = true;
		}
	}catch( err: any ){
		rtn['err'] = err.message;
	}

	return rtn;
};


const getStorage: any = async (key: string, level: string = 'public', download: boolean = false) => {
	const rtn: any = {
		data: '',
		success: false,
		err: ''
	};

	try{
		const args: any = {
			level: level,
			download: download
		};

		const signedURL: any = await Storage.get(key, args); // get key from Storage.list
		//console.log('signedURL:', signedURL);

		if( signedURL ){
			rtn.data = signedURL;
			rtn.success = true;
		}
	}catch( err: any ){
		rtn.err = err.message;
	}

	return rtn;
};


const listStorage: any = async (prefix: string = 'public/', level: string= 'public') => {
	const rtn: any = {
		data: '',
		success: false,
		err: ''
	};

	try{
		const args: any = {
			level: level
		};

		const result: any = await Storage.list(prefix, args);
		//console.log('list:', result);
		//console.log('Storage:', Storage);

		if( result ){
			//rtn['data'] = '???';
			rtn['success'] = true;
		}
	}catch( err: any ){
		rtn['err'] = err.message;
	}

	return rtn;
};


const removeStorage: any = async (key: string, level: string = 'public') => {
	const rtn: any = {
		data: '',
		success: false,
		err: ''
	};

	try{
		const args: any = {
			level: level
		};

		const result: any = await Storage.remove(key, args);
		//console.log('remove result:', result);

		if( result ){
			//rtn['data'] = '???';
			rtn['success'] = true;
		}
	}catch( err: any ){
		rtn['err'] = err.message;
		//console.log('remove err:', err);
	}

	return rtn;
};


export {
	putStorage,
	getStorage,
	listStorage,
	removeStorage
};