const eventGroups: any = () => {
	const rtnArr: any[] = [
		{ name: 'EventAdmin', label: 'Has the ability to modify events', module: 'event' },
		{ name: 'EventGuest', label: 'Has the ability to read/view events', module: 'event' },
		{ name: 'SessionAdmin', label: 'Has the ability to modify sessions', module: 'session' },
		{ name: 'SessionGuest', label: 'Has the ability to read/view sessions', module: 'session' },
		{ name: 'HallAdmin', label: 'Has the ability to modify halls', module: 'hall' },
		{ name: 'HallGuest', label: 'Has the ability to read/view halls', module: 'hall' },
		{ name: 'PresenterAdmin', label: 'Has the ability to modify presenters', module: 'presenter' },
		{ name: 'PresenterGuest', label: 'Has the ability to read/view presenters', module: 'presenter' },
		{ name: 'StageAdmin', label: 'Has the ability to modify stages', module: 'stage' },
		{ name: 'StageGuest', label: 'Has the ability to read/view stages', module: 'stage' },
		{ name: 'TableAdmin', label: 'Has the ability to modify tables', module: 'table' },
		{ name: 'TableGuest', label: 'Has the ability to read/view tables', module: 'table' },
		{ name: 'TeamAdmin', label: 'Has the ability to modify teams', module: 'team' },
		{ name: 'TeamGuest', label: 'Has the ability to read/view teams', module: 'team' },
		{ name: 'WebinarAdmin', label: 'Has the ability to modify webinars', module: 'webinar' },
		{ name: 'WebinarGuest', label: 'Has the ability to read/view webinars', module: 'webinar' }
	];

	return rtnArr;
};


const filterEventByModule: any = (module: string) => {
	const rtnArr: any[] = eventGroups().filter((row: any) => {
		return row.module == module;
	});

	return rtnArr;
};


export {
	eventGroups,
	filterEventByModule
};