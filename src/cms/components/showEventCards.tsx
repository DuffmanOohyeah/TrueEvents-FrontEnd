import {
	Card,
	CardActionArea,
	CardMedia,
	CardActions,
	CardContent,
	Typography,
	Chip,
	Button,
	IconButton
} from '@material-ui/core';
import { parseFormDate } from '../../utils/parseFormDate';
import history from '../../utils/history';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


interface Props {
	faveArr: any[];
	eventArr: any[];
	upcomingEvents: any[];
	addFave: any;
	deleteFave: any;
};


const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		maxWidth: 345,
		width: '21rem',
		minHeight: '425px',
		minWidth: '325px'
	}
	/*media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: 'red[500]'
	}*/
}));


const ShowEventCards: any = (props: Props) => {
	const tmpFaveEvts: string[] = [];
	if( props.faveArr ){
		props.faveArr.map((row: any) => tmpFaveEvts.push(row.id));
	}

	const classes: any = useStyles();

	const deleteFn: any = (eventId: string) => props.deleteFave(eventId);

	const addFn: any = (eventId: string) => props.addFave(eventId);

	return (<>
		{props.eventArr.length
			? (<>
				{props.eventArr.map((row: any, idx: number) => {
					let modulus: number = idx % 2;
					//let cn: string = 'align' + (modulus ? 'Right' : 'Left');
					let bgImg: string = `${process.env.PUBLIC_URL}/event_icon_2.png`;
					if( row.event_logo ){
						bgImg = row.event_logo;	// should be an s3 img path
					}

					return(
						<div key={idx}>

							<Card className={classes.root} style={{ float: (modulus ? 'right' : 'left') }}>
								<CardActionArea>
									<CardMedia image={bgImg} className="eventBg" component="img" />
									<CardContent>
										<Typography variant="h5" component="h2">
											{row.event_name}
											<span className="alignRight">
												{row.archived
													? <Chip color="secondary" size="small" label="Archived" />
													: <Chip color="primary" size="small" label="Active" />
												}
											</span>
										</Typography>
										<Typography variant="body2" color="textSecondary" component="p">
											{row.event_desc}
										</Typography>
										<Typography component={'span'}>
											Dates:&nbsp;
											{parseFormDate(row.start_date)}
											&nbsp;-&nbsp;
											{parseFormDate(row.end_date)}
										</Typography>
										<CardActions disableSpacing className="alignRight faveImg">
											{tmpFaveEvts.indexOf(row.id) > -1
												? (
													<IconButton aria-label="Remove from favorites" onClick={() => deleteFn(row.id)}>
														<FavoriteIcon />
													</IconButton>
												)
												: (
													<IconButton aria-label="Add to favorites" onClick={() => addFn(row.id)}>
														<FavoriteBorderIcon />
													</IconButton>
												)
											}
										</CardActions>
										<CardActions>
											<div className="alignLeft"><br />
												<Button variant="outlined"
														onClick={() => history.push(`/cms/client/event/setup/${row.id}`)}
														color="secondary">
													Edit {row.event_name}
												</Button>
												{row.primary_domain
													? (
														<>
															<br />
															<Button variant="outlined" color="primary" href={row.primary_domain} target={"_blank"}>
																Visit {row.event_name}
															</Button>
														</>
													)
													: null
												}
											</div>
										</CardActions>
									</CardContent>
								</CardActionArea>
							</Card>

							{modulus
								? (<div style={{ paddingTop: '25px', clear: 'left' }} />)
								: null
							}

						</div>
					);
				})}
			</>)
			: (<>No events found.</>)
		}
	</>);
};


export default ShowEventCards;