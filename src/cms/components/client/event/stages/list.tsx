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
	{ field: 'stage_name', headerName: 'Stage', width: 325 },
	{ field: 'stage_desc', headerName: 'Description', width: 400 }
];


const ListStages: any = (props: Props) => {

	let { id }: any = useParams();
	let eventId: string = useReactiveVar(eventIdVar);

	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [dataRows, setDataRows]: any = useState([]);

	const doRedirect: any = (id: string) => history.push('/cms/client/event/stages/' + id);

	const getStages: any = async () => {
		const params: any = {
			filter: {event_id: {eq: eventId}}
		};

		const result: any = await API.graphql(graphqlOperation( listSessions, params ));
		//console.log('result:', result.data.listSessions.items);

		const tmpStages: any[] = [];

		result.data.listSessions.items.map((row: any) => {
			row.stages.items.map((stage: any) => {
				tmpStages.push({
					id: stage.id,
					stage_name: stage.stage_name,
					stage_desc: stage.stage_desc
				});
			});
		});

		if( tmpStages.length ){
			setDataRows(tmpStages);
		}
	};

	useEffect(() => {
		getStages();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				List Stages
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
									sortModel={[{ field: 'stage_name', sort: 'asc' as GridSortDirection }]} />
							</div>
						</div>
					)
				}
			</Collapse>

		</div>
	);
};


export default ListStages;