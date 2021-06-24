import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { API, graphqlOperation } from 'aws-amplify';
import { Collapse } from '@material-ui/core';
import { listSessions } from '../../../../../graphql/queries';
import history from '../../../../../utils/history';
import { DataGrid, GridColDef, GridSortDirection } from '@material-ui/data-grid';
import { eventIdVar } from '../../../../../stores/cache';
import { prependListener } from 'node:process';


interface Props {};


const dataColumns: GridColDef[] = [
	{ field: 'first_name', headerName: 'First Name', width: 200 },
	{ field: 'last_name', headerName: 'Last Name', width: 200 },
	{ field: 'email', headerName: 'Email', width: 200 },
	{ field: 'company', headerName: 'Company', width: 200 }
];


const ListPresenters: any = (props: Props) => {

	let { id }: any = useParams();
	let eventId: string = useReactiveVar(eventIdVar);

	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [dataRows, setDataRows]: any = useState([]);

	const doRedirect: any = (id: string) => history.push('/cms/client/event/presenters/' + id);

	const getPresenters: any = async () => {
		const params: any = {
			filter: {event_id: {eq: eventId}}
		};

		const result: any = await API.graphql(graphqlOperation( listSessions, params ));

		//console.log('result:', result.data.listSessions.items);

		const tmpPresenters: any[] = [];

		result.data.listSessions.items.map((row: any) => {
			if( row.presenters ){
				row.presenters.items.map((pres: any) => {
					tmpPresenters.push({
						session_id: row.id,		// belongs to parent (session) obj
						id: pres.id,
						first_name: pres.first_name,
						last_name: pres.last_name,
						email: pres.email,
						company: pres.company
					});
				});
			}
		});

		setDataRows(tmpPresenters);
	};

	useEffect(() => {
		getPresenters();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				List Presenters
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
									sortModel={[{ field: 'last_name', sort: 'asc' as GridSortDirection }]} />
							</div>
						</div>
					)
				}
			</Collapse>

		</div>
	);
};


export default ListPresenters;