import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid, GridColDef, GridSortDirection } from '@material-ui/data-grid';
import { listSessions, listUserEventJoins } from '../../../../../graphql/queries';
import { Collapse } from '@material-ui/core';
import history from '../../../../../utils/history';
import { useReactiveVar } from '@apollo/client';
import { userIdVar, clientIdVar, eventIdVar } from '../../../../../stores/cache';
import API, { graphqlOperation } from '@aws-amplify/api';
import { parseFormDate } from '../../../../../utils/parseFormDate';


interface Props {};


const dataColumns: GridColDef[] = [
	{ field: 'session_name', headerName: 'Session', width: 325 },
	{ field: 'start_date', headerName: 'Start Date', width: 150 },
	{ field: 'end_date', headerName: 'End Date', width: 150 }
];


const ListSessions: any = (props: Props) => {

	let { id }: any = useParams();
	let userId: string = useReactiveVar(userIdVar);
	let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);
	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [dataRows, setDataRows]: any = useState([]);
	const [groupNames, setGroupNames]: any = useState([]);

	if( groupNames.indexOf('SessionAdmin') > -1 ){
		dataColumns.push({
			field: 'delete_id',
			headerName: 'Delete',
			width: 100
		});
	}

	const getSessions: any = async () => {
		const params: any = {
			filter: {
				event_id: {eq: eventId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listSessions, params ));
		//console.log('result:', result);
		const sessions: any[] = (result.data.listSessions.items || []);
		const tmpSess: any[] = [];

		sessions.map((row: any) => {
			tmpSess.push({
				id: row.id,
				session_name: row.session_name,
				start_date: parseFormDate(row.start_date),
				end_date: parseFormDate(row.end_date),
				delete_id: row.id
			});
		});

		if( tmpSess.length ){ setDataRows(tmpSess); }
	};

	const doRedirect: any = (id: string) => history.push('/cms/client/event/sessions/' + id);

	const getEvtJoins: any = async () => {
		const params: any = {
			filter: {
				cognito_sub: {eq: userId},
				client_id: {eq: clientId}
			}
		};
		const result: any = await API.graphql(graphqlOperation( listUserEventJoins, params ));
		//console.log('listUserEventJoins:', result);
		const joins: any[] = (result.data.listUserEventJoins.items || []);
		const tmpGroups: string[] = [];

		joins.map((row: any) => {
			if( row.event && row.event.id == eventId ){
				//console.log('row:', row);
				row.groups.items.map((grp: any) => {
					if( tmpGroups.indexOf(grp.name) == -1 && grp.active ){
						tmpGroups.push(grp.name);
					}
				});
			}
		});

		if( tmpGroups.length ){
			setGroupNames(tmpGroups);
		}
	};

	useEffect(() => {
		getSessions();
		//getEvtJoins();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				List Sessions
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
									sortModel={[{ field: 'start_date', sort: 'asc' as GridSortDirection }]} />
							</div>
						</div>
					)
				}
			</Collapse>

		</div>
	);
};


export default ListSessions;