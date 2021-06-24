import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid, GridColDef, GridSortDirection } from '@material-ui/data-grid';
import { Collapse } from '@material-ui/core';
import history from '../../../../utils/history';
import { listSettings } from '../../../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';


interface Props {};


const dataColumns: GridColDef[] = [
	{ field: 'setting', headerName: 'Setting', width: 300 },
	{ field: 'value', headerName: 'Value', width: 300 }
];


const ListSettings: any = (props: Props) => {

	let { id }: any = useParams();
	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [dataRows, setDataRows]: any = useState([]);

	const getSettingsData: any = async () => {
		const params: any = {
			filter: {}
		};

		const result: any = await API.graphql(graphqlOperation(
			listSettings
			//, params
		));
		//console.log('result:', result);
		try{
			const gridInfo: any[] = [];

			result.data.listSettings.items.map((row: any) => {
				//console.log('row:', row);
				gridInfo.push({
					id: row.id,
					setting: row.setting,
					value: row.value
				});
			});

			if( gridInfo.length ){
				setDataRows(gridInfo);
			}
		}catch( err: any ){}
	};

	const doRedirect: any = (id: string) => history.push('/cms/core/settings/' + id);

	useEffect(() => {
		getSettingsData();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				List Settings
			</div>
			<Collapse in={true}>
				{hideDiv
					? null
					: (
						<div style={{ height: 400, width: '100%' }}>
							<DataGrid rows={dataRows}
								columns={dataColumns}
								pageSize={25}
								onRowClick={(data: any) => doRedirect(data.id)}
								sortModel={[{ field: 'setting', sort: 'asc' as GridSortDirection }]}
							/>
						</div>
					)
				}
			</Collapse>

		</div>
	);
};


export default ListSettings;