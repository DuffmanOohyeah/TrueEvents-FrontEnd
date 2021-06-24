const sortPresentersByLastName: any = (arr: any[]) => {
	return(
		arr.sort((a: any, b: any) => {
			let rtn: number = 0;
			if( a.last_name < b.last_name ){
				rtn = -1;
			}else if( a.last_name > b.last_name ){
				rtn = 1;
			}
			return rtn;
		})
	);
};


const sortPresentersByFirstName: any = (arr: any[]) => {
	return(
		arr.sort((a: any, b: any) => {
			let rtn: number = 0;
			if( a.first_name < b.first_name ){
				rtn = -1;
			}else if( a.first_name > b.first_name ){
				rtn = 1;
			}
			return rtn;
		})
	);
};


const sortPresentersByFirstCompany: any = (arr: any[]) => {
	return(
		arr.sort((a: any, b: any) => {
			let rtn: number = 0;
			if( a.company < b.company ){
				rtn = -1;
			}else if( a.company > b.company ){
				rtn = 1;
			}
			return rtn;
		})
	);
};


export {
	sortPresentersByLastName,
	sortPresentersByFirstName,
	sortPresentersByFirstCompany
};