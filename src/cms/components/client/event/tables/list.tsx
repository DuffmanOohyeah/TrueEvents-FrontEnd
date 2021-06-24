import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { API, graphqlOperation } from 'aws-amplify';
import { Collapse } from '@material-ui/core';
import { listEvents } from '../../../../../graphql/queries';
import history from '../../../../../utils/history';
import { DataGrid, GridColDef, GridSortDirection } from '@material-ui/data-grid';
import { clientIdVar, eventIdVar } from '../../../../../stores/cache';
import { sortEvents } from '../../../../../utils/sortEvents';

interface Props {};


const dataColumns: GridColDef[] = [
	{ field: 'table_name', headerName: 'Table', width: 400 },
	{ field: 'capacity', headerName: 'Capacity', width: 200 }
];


const ListTables: any = (props: Props) => {

	let { id }: any = useParams();
	let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);

	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [dataRows, setDataRows]: any = useState([]);

	const doRedirect: any = (id: string) => history.push('/cms/client/event/tables/' + id);

	const getTables: any = async () => {
		const params: any = {
			filter: {
				//id: {eq: eventId},
				client_id: {eq: clientId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listEvents, params ));
		//console.log('result:', result.data.listEvents.items);

		const tmpTables: any[] = [];

		result.data.listEvents.items.map((row: any) => {
			if( row.id == eventId ){
				row.tables.items.map((table: any) => {
					tmpTables.push({
						id: table.id,
						table_name: table.table_name,
						capacity: table.capacity
					});
				});
			}
		});

		if( tmpTables.length ){
			setDataRows(sortEvents(tmpTables));
		}
	};

	useEffect(() => {
		getTables();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				List Tables
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
									sortModel={[{ field: 'table_name', sort: 'asc' as GridSortDirection }]} />
							</div>
						</div>
					)
				}
			</Collapse>

		</div>
	);
};


export default ListTables;