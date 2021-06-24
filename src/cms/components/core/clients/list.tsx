import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShowAlert from '../../showAlert';
import { DataGrid, GridColDef, GridSortDirection } from '@material-ui/data-grid';
import { Collapse } from '@material-ui/core';
import history from '../../../../utils/history';
import { listClients } from '../../../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';


interface Props {};


const dataColumns: GridColDef[] = [
	{ field: 'full_name', headerName: 'Full Name', width: 200 },
	{ field: 'friendly_name', headerName: 'Friendly Name', width: 150 },
	{ field: 'country', headerName: 'Country', width: 200 },
	{ field: 'archived', headerName: 'Archived', width: 150 }
];


const ListClients: any = (props: Props) => {

	let { id }: any = useParams();
	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [dataRows, setDataRows]: any = useState([]);

	const [alert, setAlert] = useState({
		show: false,
		text: '',
		severity: 'error'
	});

	const getClients: any = async () => {
		const params: any = {
			filter: {}
		};

		const result: any = await API.graphql(graphqlOperation(
			listClients
			//, params
		));
		//console.log('result:', result);
		try{
			const gridInfo: any[] = [];

			result.data.listClients.items.map((row: any) => {
				//console.log('row:', row);
				gridInfo.push({
					id: row.id,
					full_name: row.full_name,
					friendly_name: row.friendly_name,
					country: row.country,
					archived: row.archived
				});
			});

			if( gridInfo.length ){
				setDataRows(gridInfo);
			}
		}catch( err: any ){}
	};

	const doRedirect: any = (id: string) => history.push('/cms/core/clients/' + id);

	useEffect(() => {
		getClients();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				List Clients
			</div>
			<Collapse in={true}>
				<ShowAlert show={alert.show} severity={alert.severity} text={alert.text} />
				{hideDiv
					? null
					: (
						<div style={{ height: 400, width: '100%' }}>
							<DataGrid rows={dataRows}
								columns={dataColumns}
								pageSize={25}
								onRowClick={(data: any) => doRedirect(data.id)}
								sortModel={[{ field: 'full_name', sort: 'asc' as GridSortDirection }]}
							/>
						</div>
					)
				}
			</Collapse>

		</div>
	);
};


export default ListClients;