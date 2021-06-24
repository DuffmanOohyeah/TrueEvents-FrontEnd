const getWebinars: any = () => {
	const rtnArr: any[] = [];

	const types: string[] = [
		'Brightcove'
	];

	types.map((type: string) => {
		rtnArr.push({
			type: type,
			attributes: [
				{ key: 'api_key', label: 'API Key:', value: '' },
				{ key: 'url', label: 'URL:', value: 'http://' }
			]
		});
	});

	return rtnArr;
};


const filterWebinars: any = (type: string) => {
	const rtnArr: any[] = getWebinars().filter((row: any) => {
		return row.type == type;
	});
	return rtnArr;
};


const sortWebinars: any = () => {
	return(
		getWebinars().sort((a: any, b: any) => {
			let rtn: number = 0;
			if( a.type < b.type ){
				rtn = -1;
			}else if( a.type > b.type ){
				rtn = 1;
			}
			return rtn;
		})
	);
};


export {
	getWebinars,
	filterWebinars,
	sortWebinars
};