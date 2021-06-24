import { useState, useEffect } from 'react';
import ShowAlert from '../../showAlert';
import ListUsers from './list';
import EditUser from './edit';
import AddUser from './add';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';
import CmsBreadcrumb from '../../../../utils/cmsBreadcrumb';


interface Props {};


const Users: any = (props: Props) => {

	let { id }: any = useParams();

	const [alert, setAlert]: any = useState({
		show: false,
		severity: 'success',
		text: ''
	});

	/*const updateAlert: any = (key: string, value: string) => {
		setAlert({
			...alert,
			[key]: value
		});
	};*/

	const showAlert: any = () => {
		const parsed: any = queryString.parse(window.location.search);
		switch( parsed.action ){
			case 'created':
				setAlert({
					show: true,
					severity: 'success',
					text: 'User added successfully.'
				});
			break;
			case 'updated':
				setAlert({
					show: true,
					severity: 'success',
					text: 'User edited successfully.'
				});
			break;
			case 'deleted':
				setAlert({
					show: true,
					severity: 'warning',
					text: 'User deleted successfully.'
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

			<CmsBreadcrumb section="Core" page="Users" />

			{alert.show
				? <ShowAlert show={alert.show} severity={alert.severity} text={alert.text} />
				: null
			}

			<ListUsers {...props} />

			{id
				? (<><br /><EditUser {...props} /></>)
				: null
			}

			<br /><AddUser {...props} />

		</div>
	);

};


export default Users;