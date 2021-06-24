import { useState, useEffect } from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import ShowAlert from '../../showAlert';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';
import ListSettings from './list';
import EditSetting from './edit';
import AddSetting from './add';
import CmsBreadcrumb from '../../../../utils/cmsBreadcrumb';


interface Props {};


const Settings: any = (props: Props) => {

	let { id }: any = useParams();

	const [alert, setAlert]: any = useState({
		show: false,
		severity: 'success',
		text: ''
	});

	const showAlert: any = () => {
		const parsed: any = queryString.parse(window.location.search);
		switch( parsed.action ){
			case 'created':
				setAlert({
					show: true,
					severity: 'success',
					text: 'Client added successfully.'
				});
			break;
			case 'updated':
				setAlert({
					show: true,
					severity: 'success',
					text: 'Client edited successfully.'
				});
			break;
			case 'deleted':
				setAlert({
					show: true,
					severity: 'warning',
					text: 'Client deleted successfully.'
				});
			break;
			case 'error':
				setAlert({
					show: true,
					severity: 'error',
					text: 'There was an error.'
				});
			break;
		}
	};

	useEffect(() => {
		showAlert();
	}, []);

	return(
		<div>

			<CmsBreadcrumb section="Core" page="Settings" />

			{alert.show
				? <ShowAlert show={alert.show} severity={alert.severity} text={alert.text} />
				: null
			}

			<ListSettings {...props} />

			{id
				? (<><br /><EditSetting {...props} /></>)
				: null
			}

			<AddSetting {...props} />

		</div>
	);

};


export default Settings;