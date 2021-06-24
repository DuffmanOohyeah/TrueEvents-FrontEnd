import { useState, useEffect } from 'react';
import { listUsers } from '../../../../../utils/cognitoService';
//import { currentAuthenticatedTeam } from '../../../../utils/amplifyAuth';
import { useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { DataGrid, GridColDef, GridSortDirection } from '@material-ui/data-grid';
import { listUserEventJoins, listEvents, listUserClientJoins } from '../../../../../graphql/queries';
import { Collapse } from '@material-ui/core';
import history from '../../../../../utils/history';
import { API, graphqlOperation } from 'aws-amplify';
import { clientIdVar } from '../../../../../stores/cache';
//import { sortEvents } from '../../../../../utils/sortEvents';


interface Props {};


const dataColumns: GridColDef[] = [
	{ field: 'email', headerName: 'Email', width: 300 },
	{ field: 'email_verified', headerName: 'Email Verified', width: 150 },
	{ field: 'enabled', headerName: 'Enabled', width: 125 },
	{ field: 'status', headerName: 'Account Status', width: 150 }
	//{ field: 'delete', headerName: 'Delete', width: 100 }
];


const ListTeams: any = (props: Props) => {

	let { id }: any = useParams();
	let clientId: string = useReactiveVar(clientIdVar);

	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [dataRows, setDataRows]: any = useState([]);
	//const [events, setEvents]: any = useState([]);

	const getUserJoinData: any = async () => {
		const params: any = {
			filter: {client_id: {eq: clientId}}
		};

		const result: any = await API.graphql(graphqlOperation( listUserEventJoins, params ));
		//console.log('getUserJoinData:', result);

		const tmpSubs: string[] = [];

		result.data.listUserEventJoins.items.map((row: any) => {
			if( tmpSubs.indexOf(row.cognito_sub) == -1 ){
				tmpSubs.push(row.cognito_sub);
			}
		});

		//console.log('tmpSubs:', tmpSubs);

		return tmpSubs;
	};

	const doRedirect: any = (id: string) => history.push('/cms/client/event/team/' + id);

	const getCognitoUsers: any = async (subs: string[]) => {
		//console.log('subs:', subs);
		const tmpUsers: any[] = [];

		for( let idx: number = 0; idx < subs.length; idx++ ){
			let filter: string = `sub=\"${subs[idx]}\"`;
			const result: any = await listUsers( filter );
			//console.log('result:', result);

			result.Users.map((row: any) => {
				const userRow: any = {
					enabled: row.Enabled,
					status: row.UserStatus
				};

				row.Attributes.map((atts: any) => {
					switch( atts.Name ){
						case 'sub':
						case 'email':
						case 'email_verified':
							if( atts.Name == 'sub' ){ userRow.id = atts.Value; }
							else{ userRow[atts.Name] = atts.Value; }
						break;
					}
				});

				tmpUsers.push(userRow);
			});
		}	// end: for loop

		//console.log('tmpUsers:', tmpUsers);
		setDataRows(tmpUsers);
	};

	/*const getEvents: any = async () => {
		const params: any = {
			filter: {
				client_id: {eq: clientId}
			}
		};
		const result: any = await API.graphql(graphqlOperation( listEvents, params ));
		//console.log('getEvents:', result);
		setEvents(result.data.listEvents.items);
	};*/

	/*const getClientJoins: any = async () => {
		const params: any = {
			//filter: {cognito_sub: {eq: '?'}}
		};
		const result: any = await API.graphql(graphqlOperation( listUserClientJoins, params ));
		//console.log('listUserClientJoins:', result);

		const tmpClients: any[] = [];

		const joins: any[] = (result.data.listUserClientJoins.items || []);

		joins.map((row: any) => {
			if( row.client && (row.client.id == clientId) && (tmpClients.indexOf(row.client.id) == -1) ){
				tmpClients.push(row);
			}
		});

		if( tmpClients.length ){
			console.log('tmpClients:', tmpClients);
			// TODO: add users to event join table - if non existent
		}
	};*/

	useEffect(() => {
		const doAsyncs = async () => {
			const subs: string[] = await getUserJoinData();
			getCognitoUsers(subs);
		};
		doAsyncs();
		//getEvents();
		//getClientJoins();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				List Team Members
			</div>

			<Collapse in={true}>
				{hideDiv
					? null
					: (
						<div>
							<div style={{ height: 400, width: '100%' }}>
								<DataGrid rows={dataRows}
									columns={dataColumns}
									pageSize={25}
									onRowClick={(data: any) => doRedirect(data.id)}
									sortModel={[{ field: 'email', sort: 'asc' as GridSortDirection }]}
								/>
							</div>
						</div>
					)
				}
			</Collapse>

		</div>
	);
};


export default ListTeams;