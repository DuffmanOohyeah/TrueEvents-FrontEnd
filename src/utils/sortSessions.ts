const sortSessionsByName: any = (arr: any[]) => {
	return(
		arr.sort((a: any, b: any) => {
			let rtn: number = 0;
			if( a.session_name < b.session_name ){
				rtn = -1;
			}else if( a.session_name > b.session_name ){
				rtn = 1;
			}
			return rtn;
		})
	);
};


const sortSessionsByDate: any = (arr: any[]) => {
	return(
		arr.sort((a: any, b: any) => {
			let rtn: number = 0;
			if( a.start_date < b.start_date ){
				rtn = -1;
			}else if( a.start_date > b.start_date ){
				rtn = 1;
			}
			return rtn;
		})
	);
};


export {
	sortSessionsByName,
	sortSessionsByDate
};