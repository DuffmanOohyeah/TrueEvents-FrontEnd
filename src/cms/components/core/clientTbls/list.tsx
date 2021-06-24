import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid, GridColDef, GridSortDirection } from '@material-ui/data-grid';
import { Collapse } from '@material-ui/core';
import history from '../../../../utils/history';
//import { listSettings } from '../../../../graphql/queries';
//import { API, graphqlOperation } from 'aws-amplify';
import { listTables } from '../../../../utils/dynamoService';


interface Props {};


const dataColumns: GridColDef[] = [
	{ field: 'prefix', headerName: 'Prefix', width: 300 },
	{ field: 'full_name', headerName: 'Full Name', width: 400 }
];


const ListClientTbls: any = (props: Props) => {

	let { id }: any = useParams();
	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [dataRows, setDataRows]: any = useState([]);

	const doRedirect: any = (id: string) => history.push('/cms/core/clientTbls/' + id);

	const getClientTables: any = async () => {
		const result: any = await listTables(true);

		//console.log('result:', result);

		if( result ){
			const tmpArr: any[] = [];

			result.map((row: any) => {
				tmpArr.push({
					id: row.full,
					prefix: row.abbr,
					full_name: row.full
				});
			});

			if( tmpArr.length ){
				setDataRows(tmpArr);
			}
		}
	};

	useEffect(() => {
		getClientTables();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				List Client DB Tables
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
								sortModel={[{ field: 'prefix', sort: 'asc' as GridSortDirection }]}
							/>
						</div>
					)
				}
			</Collapse>

		</div>
	);
};


export default ListClientTbls;