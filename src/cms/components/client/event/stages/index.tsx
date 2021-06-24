import { useState, useEffect } from 'react';
import ShowAlert from '../../../showAlert';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';
import { useReactiveVar } from '@apollo/client';
import { listUserEventJoins } from '../../../../../graphql/queries';
import { clientIdVar, userIdVar } from '../../../../../stores/cache';
import { API, graphqlOperation } from 'aws-amplify';
import ListStages from './list';
import EditStage from './edit';
import AddStage from './add';
import CmsBreadcrumb from '../../../../../utils/cmsBreadcrumb';
import CmsHeader from '../../../../../utils/cmsHeader';


interface Props {};


const Stages: any = (props: Props) => {

	let { id }: any = useParams();
	let userId: string = useReactiveVar(userIdVar);
	let clientId: string = useReactiveVar(clientIdVar);

	const [userGroups, setUserGroups]: any = useState(['StageGuest']);

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
			//const tmpEvts: string[] = [];
			const tmpGrps: string[] = [];

			result.data.listUserEventJoins.items.map((row: any) => {
				/*if( row.event && row.event.id ){
					tmpEvts.push(row.event.id);
				}*/
				row.groups.items.map((group: any) => {
					tmpGrps.push(group.name);
				});
			});

			//console.log('tmpEvts:', tmpEvts);
			//console.log('tmpGrps:', tmpGrps);

			/*if( tmpEvts.length ){
				setUserEvents(tmpEvts);
			}*/

			if( tmpGrps.length ){
				setUserGroups(tmpGrps);
			}
		}catch( err: any ){}

	};

	useEffect(() => {
		getUserGroups();
		showAlert();
	}, []);

	return(
		<div>

			<CmsBreadcrumb section="Event" page="Stages" />
			<CmsHeader />

			{alert.show
				? <ShowAlert show={alert.show} severity={alert.severity} text={alert.text} />
				: null
			}

			<ListStages {...props} />

			{id
				? (<><br /><EditStage {...props} userGroups={userGroups} /></>)
				: null
			}

			{userGroups.indexOf('StageAdmin') > -1
				? (<><br />{<AddStage {...props} />}</>)
				: null
			}

		</div>
	);

};


export default Stages;