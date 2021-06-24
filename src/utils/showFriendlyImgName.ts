const showFriendlyName: any = (path: string) => {
	const arr: string[] = path.split('/');
	let name: string = '';
	if( arr.length ){
		name = arr[arr.length - 1];
		name = name.split('?')[0];
	}
	//console.log('img:', img);
	return name;
};


export default showFriendlyName;