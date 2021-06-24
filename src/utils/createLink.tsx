import { validateUrl } from './validateUrl';


const createLink: any = (url: string) => {
	let rtn: any = '';

	if(
		url.toLowerCase().indexOf('http://') == -1
		&&
		url.toLowerCase().indexOf('https://') == -1
	){ url = 'http://' + url; }

	if( validateUrl(url) ){
		rtn = <a href={url} target="_blank">{url}</a>;
	}

	return rtn;
};


const createMailTo: any = (email: string, showEmail: boolean = false) => {
	let rtn: any = '';

	if( email.toLowerCase().indexOf('mailto:') == -1 ){
		email = 'mailto:' + email;
	}

	if( showEmail ){ rtn = <a href={email} target="_blank">{email}</a> }
	else{ rtn = <a href={email}>Email</a> }

	return rtn;
};


export { createLink, createMailTo };