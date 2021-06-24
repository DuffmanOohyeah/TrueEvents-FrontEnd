import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid, GridColDef, GridSortDirection /*ValueGetterParams*/ } from '@material-ui/data-grid';
import { listEvents, listUserEventJoins } from '../../../../../graphql/queries';
import { Collapse } from '@material-ui/core';
import history from '../../../../../utils/history';
import { useReactiveVar } from '@apollo/client';
import { clientIdVar, userIdVar } from '../../../../../stores/cache';
import API, { graphqlOperation } from '@aws-amplify/api';
import { parseFormDate } from '../../../../../utils/parseFormDate';
//import { getJSDocImplementsTags } from 'typescript';


interface Props {};


const dataColumns: GridColDef[] = [
	{ field: 'event_name', headerName: 'Event', width: 200 },
	{ field: 'start_date', headerName: 'Start Date', width: 125 },
	{ field: 'end_date', headerName: 'End Date', width: 125 },
	{ field: 'country', headerName: 'Country', width: 150 },
	{ field: 'archived', headerName: 'Archived', width: 125 }
];


const ListEvents: any = (props: Props) => {

	let { id }: any = useParams();
	let clientId: string = useReactiveVar(clientIdVar);
	let userId: string = useReactiveVar(userIdVar);
	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [dataRows, setDataRows]: any = useState([]);

	/*const getClientEvents: any = async () => {
		const params: any = {
			filter: {client_id: {eq: clientId}}
		};

		const result: any = await API.graphql(graphqlOperation( listEvents, params ));
		//console.log('result:', result);

		const tmpArr: any[] = [];

		result.data.listEvents.items.map((row: any) => {
			tmpArr.push({
				id: row.id,
				event_name: row.event_name,
				start_date: parseFormDate(row.start_date),
				end_date: parseFormDate(row.end_date),
				country: row.country,
				archived: row.archived
			});
		});

		if( tmpArr.length ){
			setDataRows(tmpArr);
		}
	};*/

	const getJoins: any = async () => {
		const params: any = {
			filter: {
				cognito_sub: {eq: userId},
				client_id: {eq: clientId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listUserEventJoins, params ));

		//console.log('result:', result);

		const tmpArr: any[] = [];

		result.data.listUserEventJoins.items.map((row: any) => {
			tmpArr.push({
				id: row.event.id,
				event_name: row.event.event_name,
				start_date: parseFormDate(row.event.start_date),
				end_date: parseFormDate(row.event.end_date),
				country: row.event.country,
				archived: row.event.archived
			});
		});

		if( tmpArr.length ){
			setDataRows(tmpArr);
		}

	};

	const doRedirect: any = (id: string) => history.push('/cms/client/event/setup/' + id);

	useEffect(() => {
		//getClientEvents();
		getJoins();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				List Events
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


export default ListEvents;