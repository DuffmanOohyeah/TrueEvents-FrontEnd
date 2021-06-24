import { MenuItem, InputLabel, Select, FormControl } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useReactiveVar } from '@apollo/client';
import { clientIdVar, userIdVar, userClientIdsVar } from '../../stores/cache';
import { useEffect, useState } from 'react';
import { listUserClientJoins } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { sortClientsByName } from '../../utils/sortClients';


interface Props {
	clientId: string;
	onChange: any;
};


const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		width: '100%'
	},
	select: {
		width: '22ch'
	}
}));


const SelectClient: any = (props: Props) => {

	//console.log('props:',props);
	const classes: any = useStyles();
	let userId: string = useReactiveVar(userIdVar);
	let orig_clientId: string = useReactiveVar(clientIdVar);
	let curr_clientId: string = (props.clientId || orig_clientId);

	const [clients, setClients]: any = useState([]);

	const getClients: any = async () => {
		if( userId ){
			const params: any = {
				filter: {cognito_sub: {eq: userId}}
			};

			const result: any = await API.graphql(graphqlOperation( listUserClientJoins, params ));

			//console.log('getClients:', result);
			const clientArr: any[] = [];
			const userClientIds: string[] = [];

			try{
				const joins: any[] = (result.data.listUserClientJoins.items || []);
				//console.log('joins:', joins);

				joins.map((row: any) => {
					if( row.client ){
						clientArr.push({
							id: row.client.id,
							full_name: row.client.full_name,
							friendly_name: row.client.friendly_name
						});
						userClientIds.push(row.client.id);
					}
				});

				/*for( let j: number = 0; j < joins.length; j++ ){
					const uClients: any[] = (joins[j].clients.items || []);
					console.log('uClients:', uClients);

					for( let c: number = 0; c < uClients.length; c++ ){
						const client: any = uClients[c];
						clientArr.push({
							id: client.id,
							full_name: client.full_name,
							friendly_name: client.friendly_name
						});
						userClientIds.push(client.id);
					}
				}*/

				userClientIdsVar(userClientIds);
				setClients(clientArr);
			}catch( err: any ){}
		}
	};

	useEffect(() => {
		getClients();
	}, [props]);

	return(
		<div className={classes.root}><br />

			<FormControl variant="filled">

				<InputLabel id="client-box">
					Client:
				</InputLabel>

				<Select labelId="client-box"
						name="clientId"
						className={classes.select}
						value={curr_clientId}
						onChange={props.onChange}>
					<MenuItem value="" disabled>
						<i>- Select -</i>
					</MenuItem>
					{sortClientsByName(clients).map((row: any, idx: number) => (
						<MenuItem key={idx}
								value={row.id}
								data-friendlyname={row.friendly_name}
								data-fullname={row.full_name}>
							{row.full_name}
						</MenuItem>
					))}
				</Select>

			</FormControl>

		</div>
	);

};


export default SelectClient;