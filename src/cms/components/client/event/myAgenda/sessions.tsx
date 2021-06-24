import moment from 'moment';
import Stages from './stages';
import Presenters from './presenters';
import Card from '@material-ui/core/Card';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	CardContent,
	Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';


interface Props {
	sessionArr: any[];
};

let timeFormat: string = 'HH:ss';

const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		minWidth: '100%'
	},
	heading: {
		//fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	},
	summary: {
		backgroundColor: '#F5F5F5'
	}
}));


const Sessions: any = (props: Props) => {

	const sessions: any[] = (props.sessionArr || []);
	const classes: any = useStyles();

	//console.log('sessions:', sessions);

	return(
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Typography variant="h6">
					Session(s)
				</Typography>

				{sessions.length
					? (sessions.map((row: any) => {
						{/*console.log('row:', row)*/}
						return(
							<div>
								<Card className={classes.root} variant="outlined">
									<CardContent>

										<Typography variant="h6">
											{row.session_name}
										</Typography>

										<ul>
											{row.session_desc
												? (<li>Description: {row.session_desc}</li>)
												: null
											}
											<li>
												Time:&nbsp;
												{moment(row.start_date).format(timeFormat)}
												&nbsp;-&nbsp;
												{moment(row.end_date).format(timeFormat)}
											</li>
											<li>
												Hall:&nbsp;
												{row.hall
													? (
														<span>
															{row.hall.hall_name}&nbsp;
															({row.hall.hall_desc})
														</span>
													)
													: (<span>(No hall associated)</span>)
												}
											</li>
										</ul>

										<Accordion>
											<AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.summary}>
												<Typography className={classes.heading}>
													Stage(s):
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Stages stageArr={row.stages.items} />
											</AccordionDetails>
										</Accordion>

										<Accordion>
											<AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.summary}>
												<Typography className={classes.heading}>
													Presenter(s):
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Presenters presenterArr={row.presenters.items} />
											</AccordionDetails>
										</Accordion>

									</CardContent>
								</Card>
							</div>
						);
					}))
					: (<div>You have not favourited any sessions for this date.</div>)
				}

			</CardContent>
		</Card>
	);

};


export default Sessions;