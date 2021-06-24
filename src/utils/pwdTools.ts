const pattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
/*
	Minimum eight characters,
	at least one uppercase letter,
	one lowercase letter,
	one number and
	one special character
*/


const validatePwd: any = (pwd: string) => {
	let rtnBln: boolean = pattern.test(pwd);	// returns boolean
	return rtnBln;
};


export {
	validatePwd
};