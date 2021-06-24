import { useState, useEffect } from 'react';
import ShowAlert from '../../../showAlert';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';
import { useReactiveVar } from '@apollo/client';
import { clientIdVar, eventIdVar, userIdVar } from '../../../../../stores/cache';
import { listUserEventJoins } from '../../../../../graphql/queries';
import CmsBreadcrumb from '../../../../../utils/cmsBreadcrumb';
import CmsHeader from '../../../../../utils/cmsHeader';
import { API, graphqlOperation } from 'aws-amplify';
import ListTables from './list';
import EditTable from './edit';
import AddTable from './add';


interface Props {};


const Tables = (props: Props) => {

	let { id }: any = useParams();
	let userId: string = useReactiveVar(userIdVar);
	let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);

	const [userGroups, setUserGroups]: any = useState(['TableGuest']);

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
					text: 'Stage added successfully.'
				});
			break;
			case 'updated':
				setAlert({
					show: true,
					severity: 'success',
					text: 'Stage edited successfully.'
				});
			break;
			case 'deleted':
				setAlert({
					show: true,
					severity: 'warning',
					text: 'Stage deleted successfully.'
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

	const getUserGroups: any = async () => {
		const params: any = {
			filter: {
				cognito_sub: {eq: userId},
				client_id: {eq: clientId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listUserEventJoins, params ));
		//console.log('listUserEventJoins:', result);

		try{
			const tmpGrps: string[] = [];

			result.data.listUserEventJoins.items.map((row: any) => {
				if( row.event && row.event.id == eventId ){
					row.groups.items.map((group: any) => {
						tmpGrps.push(group.name);
					});
				}
			});

			//console.log('tmpGrps:', tmpGrps);

			if( tmpGrps.length ){
				setUserGroups(tmpGrps);
			}
		}catch( err: any ){}

	};

	useEffect(() => {
		getUserGroups();
		showAlert();
	}, []);

	return (
		<div>

			<CmsBreadcrumb section="Event" page="Tables" />
			<CmsHeader />

			{alert.show
				? <ShowAlert show={alert.show} severity={alert.severity} text={alert.text} />
				: null
			}

			<ListTables {...props} />

			{id
				? (<><br /><EditTable {...props} userGroups={userGroups} /></>)
				: null
			}

			{userGroups.indexOf('TableAdmin') > -1
				? (<><br />{<AddTable {...props} />}</>)
				: null
			}

		</div>
	);

};


export default Tables;