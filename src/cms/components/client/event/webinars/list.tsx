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
	{ field: 'session_name', headerName: 'Session', width: 200 },
	{ field: 'webinar_name', headerName: 'Webinar', width: 200 },
	{ field: 'webinar_desc', headerName: 'Description', width: 300 }
];


const ListWebinars: any = (props: Props) => {

	let { id }: any = useParams();
	let eventId: string = useReactiveVar(eventIdVar);

	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [dataRows, setDataRows]: any = useState([]);

	const doRedirect: any = (id: string) => history.push('/cms/client/event/webinars/' + id);

	const getWebinars: any = async () => {
		const params: any = {
			filter: {event_id: {eq: eventId}}
		};

		const result: any = await API.graphql(graphqlOperation( listSessions, params ));
		//console.log('result:', result.data.listSessions.items);

		const tmpWebinars: any[] = [];

		result.data.listSessions.items.map((row: any) => {
			row.webinars.items.map((webinar: any) => {
				tmpWebinars.push({
					id: webinar.id,
					session_name: row.session_name,	// webinar parent
					webinar_name: webinar.webinar_name,
					webinar_desc: webinar.webinar_desc
				});
			});
		});

		if( tmpWebinars.length ){ setDataRows(tmpWebinars); }
	};

	useEffect(() => {
		getWebinars();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				List Webinars
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
									sortModel={[{ field: 'webinar_name', sort: 'asc' as GridSortDirection }]} />
							</div>
						</div>
					)
				}
			</Collapse>

		</div>
	);
};


export default ListWebinars;