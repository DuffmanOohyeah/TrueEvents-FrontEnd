import { InMemoryCache, makeVar } from '@apollo/client';


const cache: any = new InMemoryCache();

/* start: user vars */
const userIdVar: any = makeVar('');
const userEmailVar: any = makeVar('');
const userFirstNameVar: any = makeVar('');
const userLastNameVar: any = makeVar('')
const userClientIdsVar: any = makeVar([]);
const userRolesVar: any = makeVar([]);
/* end: user vars */


/* start: client vars */
const clientIdVar: any = makeVar('');
const clientFullNameVar: any = makeVar('');
const clientFriendlyNameVar: any = makeVar('');
/* end: client vars */


/* start: event vars */
const eventIdVar: any = makeVar('');
const eventNameVar: any = makeVar('');
/* end: event vars */


const clearCache: any = () => {
	userIdVar('');
	userEmailVar('');
	userFirstNameVar('');
	userLastNameVar('');
	userClientIdsVar([]);
	userRolesVar([]);
	clientIdVar('');
	clientFullNameVar('');
	clientFriendlyNameVar('');
	eventIdVar('');
	eventNameVar('');
};


export {
	cache,
	userIdVar,
	userEmailVar,
	userFirstNameVar,
	userLastNameVar,
	userClientIdsVar,
	userRolesVar,
	clientIdVar,
	clientFullNameVar,
	clientFriendlyNameVar,
	eventIdVar,
	eventNameVar,
	clearCache
};