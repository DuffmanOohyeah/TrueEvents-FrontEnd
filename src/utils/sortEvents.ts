import moment from 'moment';


const sortEvents: any = (arr: any[]) => {
	return(
		arr.sort((a: any, b: any) => {
			let rtn: number = 0;
			if( a.event_name < b.event_name ){
				rtn = -1;
			}else if( a.event_name > b.event_name ){
				rtn = 1;
			}
			return rtn;
		})
	);
};


const sortEventsByDate: any = (arr: any[]) => {
	return(
		arr.sort((a: any, b: any) => {
			let rtn: number = 0;
			if( moment(a.start_date) < moment(b.start_date) ){
				rtn = -1;
			}else if( moment(a.start_date) > moment(b.start_date) ){
				rtn = 1;
			}
			return rtn;
		})
	);
};


export {
	sortEvents,
	sortEventsByDate
};