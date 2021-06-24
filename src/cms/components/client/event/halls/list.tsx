import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { API, graphqlOperation } from 'aws-amplify';
import { Collapse } from '@material-ui/core';
import { listSessions } from '../../../../../graphql/queries';
import history from '../../../../../utils/history';
import { DataGrid, GridColDef, GridSortDirection } from '@material-ui/data-grid';
import { eventIdVar } from '../../../../../stores/cache';


interface Props {};


const dataColumns: GridColDef[] = [
	{ field: 'hall_name', headerName: 'Hall', width: 325 },
	{ field: 'hall_desc', headerName: 'Description', width: 400 }
];


const ListHalls: any = (props: Props) => {

	let { id }: any = useParams();
	let eventId: string = useReactiveVar(eventIdVar);

	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [dataRows, setDataRows]: any = useState([]);

	const doRedirect: any = (id: string) => history.push('/cms/client/event/halls/' + id);

	const getHalls: any = async () => {
		const params: any = {
			filter: {event_id: {eq: eventId}}
		};

		const result: any = await API.graphql(graphqlOperation( listSessions, params ));

		//console.log('result:', result.data.listSessions.items);

		const tmpHalls: any[] = [];

		result.data.listSessions.items.map((row: any) => {
			if( row.hall ){
				tmpHalls.push({
					id: row.hall.id,
					hall_name: row.hall.hall_name,
					hall_desc: row.hall.hall_desc
				});
			}
		});

		setDataRows(tmpHalls);
	};

	useEffect(() => {
		getHalls();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				List Halls
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
									sortModel={[{ field: 'hall_name', sort: 'asc' as GridSortDirection }]} />
							</div>
						</div>
					)
				}
			</Collapse>

		</div>
	);
};


export default ListHalls;