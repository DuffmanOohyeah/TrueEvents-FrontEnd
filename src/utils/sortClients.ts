const sortClientsByName: any = (arr: any[]) => {
	return(
		arr.sort((a: any, b: any) => {
			let rtn: number = 0;
			if( a.full_name < b.full_name ){
				rtn = -1;
			}else if( a.full_name > b.full_name ){
				rtn = 1;
			}
			return rtn;
		})
	);
};


export {
	sortClientsByName
};