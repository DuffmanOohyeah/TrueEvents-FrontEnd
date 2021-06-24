const transposeNodeEnv: any = () => {
	let rtn: string = process.env.NODE_ENV;

	if( process.env.NODE_ENV ){
		switch( process.env.NODE_ENV.toLowerCase() ){
			case 'development':
				rtn = 'dev';	// mapped because of environment naming in git/aws
			break;
		}
	}

	return rtn;
};


export {
	transposeNodeEnv
};