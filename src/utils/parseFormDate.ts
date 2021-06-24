import moment from 'moment';


let dtFormat: string = 'DD/MM/YYYY';


interface Props {};


const parseFormDate: any = (date: any, format: string = '') => {
	let rtnDate: string = 'n/a';
	format = (format || dtFormat);
	if( moment(date).isValid() ){
		rtnDate = moment(date).format(format);
	}
	return rtnDate;
};


export {
	parseFormDate
};