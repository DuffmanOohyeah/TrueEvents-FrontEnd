import { MenuItem, InputLabel, Select, FormControl } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useReactiveVar } from '@apollo/client';
import { clientIdVar, eventIdVar } from '../../stores/cache';
import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents, listUserEventJoins } from '../../graphql/queries';
import { getLocalStorage } from '../../stores/localStorage';
import { sortEvents } from '../../utils/sortEvents';


interface Props {
	clientId: string;
	eventId: string;
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


const SelectEvent: any = (props: Props) => {

	//console.log('props:', props);
	const classes: any = useStyles();
	let userId: string = getLocalStorage('userId');
	let orig_clientId: string = useReactiveVar(clientIdVar);
	let curr_clientId: string = (props.clientId || orig_clientId);
	let orig_eventId: string = useReactiveVar(eventIdVar);
	let curr_eventId: string = (props.eventId || orig_eventId);

	const [events, setEvents]: any = useState([]);
	//const [clientId, setClientId]: any = useState('');

	/*const getClientEvents_OLD: any = async () => {
		const params: any = {
			filter: {
				client_id: {eq: curr_clientId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listEvents, params ));

		//console.log('params:', params);
		//console.log('result:', result);

		const tmpEvts: any[] = [];

		result.data.listEvents.items.map((row: any) => {
			tmpEvts.push({
				id: row.id,
				event_name: row.event_name
			});
		});

		setEvents(tmpEvts);
	};*/

	const getClientEvents: any = async () => {
		const params: any = {
			filter: {
				cognito_sub: {eq: userId},
				client_id: {eq: curr_clientId}
			}
		};
		const result: any = await API.graphql(graphqlOperation( listUserEventJoins, params ));
		const joins: any[] = (result.data.listUserEventJoins.items || []);
		//console.log('listUserEventJoins:', joins);

		const tmpEvts: any[] = [];
		const tmpEvtIds: string[] = [];	// used to ensure distinct events in selet box

		joins.map((row: any) => {
			if( row.event && tmpEvtIds.indexOf(row.event.id) == -1 ){
				//console.log('event:', row.event);
				tmpEvts.push({
					id: row.event.id,
					event_name: row.event.event_name
				});
				tmpEvtIds.push(row.event.id);
			}
		});

		setEvents(tmpEvts);
	};

	useEffect(() => {
		getClientEvents();
		//setClientId(curr_clientId);
	}, [props]);

	return(
		<div className={classes.root}><br />

			<FormControl variant="filled">

				<InputLabel id="event-box">
					Event:
				</InputLabel>

				<Select labelId="event-box"
						name="eventId"
						className={classes.select}
						value={curr_eventId}
						onChange={props.onChange}>
					<MenuItem value="" disabled>
						<i>- Select -</i>
					</MenuItem>
					{sortEvents(events).map((row: any, idx: number) => {
						return(
							<MenuItem key={idx}
									value={row.id}
									data-eventname={row.event_name}>
								{row.event_name}
							</MenuItem>
						);
					})}
				</Select>

			</FormControl>

		</div>
	);

};


export default SelectEvent;