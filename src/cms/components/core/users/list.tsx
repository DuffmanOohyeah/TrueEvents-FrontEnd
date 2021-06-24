import { useState, useEffect } from 'react';
import { listUsers, adminDeleteUser } from '../../../../utils/cognitoService';
//import { currentAuthenticatedUser } from '../../../../utils/amplifyAuth';
import { useParams } from 'react-router-dom';
import ShowAlert from '../../showAlert';
import { DataGrid, GridColDef, GridSortDirection /*ValueGetterParams*/ } from '@material-ui/data-grid';
//import { listUserClientJoins } from '../../../../graphql/queries';
import { Collapse } from '@material-ui/core';
import history from '../../../../utils/history';


interface Props {};


const dataColumns: GridColDef[] = [
	{ field: 'email', headerName: 'Email', width: 200 },
	{ field: 'email_verified', headerName: 'Email Verified', width: 150 },
	{ field: 'enabled', headerName: 'Enabled', width: 125 },
	{ field: 'status', headerName: 'Account Status', width: 150 },
	{ field: 'delete', headerName: 'Delete', width: 100 }
];


const ListUsers: any = (props: Props) => {

	let { id }: any = useParams();
	const [hideDiv, setHideDiv]: any = useState((id ? true : false));
	const [dataRows, setDataRows]: any = useState([]);

	const [alert, setAlert] = useState({
		show: false,
		text: '',
		severity: 'error'
	});

	const getUsers: any = () => {
		listUsers()
			.then((result: any) => {
				//console.log('result:', result);
				try{
					const gridInfo: any[] = [];

					result.Users.map((row: any) => {
						const info: any = {
							id: '',
							email: '',
							email_verified: '',
							enabled: row.Enabled.toString(),
							status: row.UserStatus
						};

						row.Attributes.map((att: any) => {
							let key: string = (att.Name == 'sub' ? 'id' : att.Name);
							info[key] = att.Value.toString();
						});

						gridInfo.push(info);
					});

					if( gridInfo.length ){
						setDataRows(gridInfo);
					}
				}catch( err: any ){}
			});
	};


	const doRedirect: any = (id: string) => history.push('/cms/core/users/' + id);

	useEffect(() => {
		getUsers();
	}, []);

	return(
		<div>

			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				List Users
			</div>
			<Collapse in={true}>
				<ShowAlert show={alert.show} severity={alert.severity} text={alert.text} />
				{hideDiv
					? null
					: (
						<div>
							<div style={{ height: 400, width: '100%' }}>
								<DataGrid rows={dataRows}
									columns={dataColumns}
									pageSize={25}
									//onRowClick={(data: any) => history.push('/cms/core/users/' + data.id)}
									//onRowClick={(data: any) => history.push('/cms/core/users/' + data.id)}
									onRowClick={(data: any) => doRedirect(data.id)}
									//onRowClick={(data: any) => window.location.assign('/cms/core/users/' + data.id)}
									//onSelectionModelChange={itm => console.log(itm)}
									//onRowSelected={(evt: any) => history.push('/cms/core/users/' + evt.data.id)}
									sortModel={[{ field: 'email', sort: 'asc' as GridSortDirection }]}
								/>
							</div>
						</div>
					)
				}
			</Collapse>

		</div>
	);
};


export default ListUsers;