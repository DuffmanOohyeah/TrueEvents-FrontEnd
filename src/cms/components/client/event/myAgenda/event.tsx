import { parseFormDate } from '../../../../../utils/parseFormDate';
import { filterZoneByAbbr } from '../../../../../utils/timezoneData';
import ModalWindow from '../../../../../utils/imgModal';
import { sortSessionsByDate } from '../../../../../utils/sortSessions';
import Sessions from './sessions';
import moment from 'moment';
import { Card, CardMedia } from '@material-ui/core';
import { CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createLink } from '../../../../../utils/createLink';
import { getStorage } from '../../../../../utils/awsStorage';
import { useState, useEffect } from 'react';


let dtFormat: string = 'DD/MM/YYYY HH:mm Z';

interface Props {
	eventObj: any;
	eventDatesArr: string[];
	faveSessions: any[];
};


const useStyles = makeStyles({
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
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	}
});


const Event: any = (props: Props) => {

	const event: any = (props.eventObj || {});

	const classes = useStyles();
	const [s3Img, setS3Img]: any = useState(`${process.env.PUBLIC_URL}/event_icon_2.png`);

	//console.log('event:', event);

	const filterSessionsByDate: any = (date: any) => {
		//console.log('date:', date.format('DD/MM/YYYY'));
		const arr: any[] = props.faveSessions.filter((row: any) => {
			//console.log('diff:', date.diff(moment(row.start_date), 'days'));
			//console.log('start_date:', moment(row.start_date).format('DD/MM/YYYY'));

			let dtDiff: number = moment(row.start_date).diff(date, 'days', true);
				dtDiff = Math.ceil(dtDiff);
			//console.log('dtDiff:', dtDiff);
			return( dtDiff == 0 );
		});
		return sortSessionsByDate(arr);
	};

	const getImg: any = () => {
		getStorage(event.event_logo)
			.then((result: any) => {
				//console.log('result:', result);
				if( result.success ){
					setS3Img(result.data);
				}
			});
	};

	useEffect(() => {
		getImg();
	}, []);

	return(
		<div><br />

			{event.id
				? (
					<>
						<Card className={classes.root} variant="outlined">
							<CardContent>
								<Typography variant="h6">
									{event.event_name}
								</Typography>
								<CardMedia image={s3Img}
									className="eventBg"
									title={event.event_name}
									component="img" />
								<ul>
									{event.event_desc
										? (<li>Description: {event.event_desc}</li>)
										: null
									}
									<li>
										Dates:&nbsp;
										{parseFormDate(event.start_date, dtFormat)}
										&nbsp;-&nbsp;
										{parseFormDate(event.end_date, dtFormat)}
									</li>
									{event.timezone_abbr
										? (<li>Timezone: {filterZoneByAbbr(event.timezone_abbr)}</li>)
										: null
									}
									{event.city
										? (<li>City: {event.city}</li>)
										: null
									}
									{event.county
										? (<li>County: {event.county}</li>)
										: null
									}
									{event.country
										? (<li>Country: {event.country}</li>)
										: null
									}
									{event.primary_domain
										? (<li>Domain: {createLink(event.primary_domain)}</li>)
										: null
									}
									{/*<li>
										Logo:&nbsp;
										{event.event_logo
											? <ModalWindow imgPath={event.event_logo} />
											: (<span>No logo associated.</span>)
										}
									</li>*/}
								</ul>

								{props.eventDatesArr.map((date: any, idx: number) => {
									return(
										<div><br />
											<Card className={classes.root} variant="outlined">
												<CardContent>
													<Typography variant="h6">
														Day #{idx+1}: {parseFormDate(date)}
													</Typography>
													<Sessions sessionArr={filterSessionsByDate(date)} />
												</CardContent>
											</Card>
										</div>
									);
								})}

							</CardContent>
						</Card>
					</>
				)
				: (<div>No event found.</div>)
			}

		</div>
	);

};


export default Event;