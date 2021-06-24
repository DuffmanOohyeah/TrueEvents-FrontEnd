import { useReactiveVar } from '@apollo/client';
import { clientFullNameVar, eventNameVar, eventIdVar } from '../stores/cache';
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { getEvent } from '../graphql/queries';
import { parseFormDate } from '../utils/parseFormDate';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


interface Props {
	showEventInfo: boolean;
};
let dtFormat: string = 'DD/MM/YYYY HH:mm';
let space: any = String.fromCharCode(160);

const useStyles: any = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	}
});


const CmsHeader: any = (props: Props) => {

	let clientFullName: string = useReactiveVar(clientFullNameVar);
	let eventName: string = useReactiveVar(eventNameVar);
	let eventId: string = useReactiveVar(eventIdVar);
	const classes: any = useStyles();

	let showEventInfo: boolean = (props.showEventInfo || true);

	const [eventInfo, setEventInfo]: any = useState({
		start_date: '',
		end_date: ''
	});

	const getEventInfo: any = async () => {
		if( eventId ){
			const result: any = await API.graphql(graphqlOperation( getEvent, {id: eventId} ));
			//console.log('result:', result);
			try{
				const row: any = result.data.getEvent;
				setEventInfo({
					start_date: row.start_date,
					end_date: row.end_date
				});
			}catch( err: any ){}
		}
	};

	useEffect(() => {
		getEventInfo();
	}, []);

	return(
		<><br />
			<Card variant="outlined" className={classes.root}>
				<CardContent>

					<Typography variant="h6" component="h2">
						Client: {clientFullName || 'n/a'}
					</Typography>

					{showEventInfo == true
						? (
							<>
								<Typography className={classes.pos} color="textSecondary">
									Event: {eventName || 'n/a'}
								</Typography>

								<Typography variant="body2" component="p">
									Event Dates:{space.repeat(1)}
									{parseFormDate(eventInfo.start_date, dtFormat)}
									{space.repeat(1)}-{space.repeat(1)}
									{parseFormDate(eventInfo.end_date, dtFormat)}
								</Typography>
							</>
						)
						: null
					}

				</CardContent>
			</Card>
		</>
	);

};


export default CmsHeader;