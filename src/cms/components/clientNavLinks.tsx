//import { GET_CLIENT_INFO } from '../../stores/client';
//import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { clientIdVar, eventIdVar } from '../../stores/cache';
import { listSettings } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';


interface Props {};


const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
		//color: theme.palette.text.secondary
	}
}));


const ClientNavLinks: any = (props: Props) => {

	let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);
	const [chatName, setChatName]: any = useState('TrueChat');
	const classes: any = useStyles();

	const getSettings: any = async () => {
		const params: any = {
			filter: {setting: {eq: 'chat_name'}}
		};
		const result: any = await API.graphql(graphqlOperation( listSettings, params ));
		//console.log('result:', result.data.listSettings.items);

		result.data.listSettings.items.map((row: any) => {
			switch( row.setting ){
				case 'chat_name':
					setChatName(row.value);
				break;
			}
		});

	};

	useEffect(() => {
		getSettings();
	}, []);

	return (
		<div className={classes.root}>
			{clientId
				? (

					<div>

						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>Event</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									<ul style={{ listStyleType: "circle" }}>
										<li><NavLink to="/cms/client/event/setup">Setup</NavLink></li>
										{eventId
											? (
												<>
													<li><NavLink to="/cms/client/event/sessions">Sessions</NavLink></li>
													<li><NavLink to="/cms/client/event/halls">Halls</NavLink></li>
													<li><NavLink to="/cms/client/event/presenters">Presenters</NavLink></li>
													<li><NavLink to="/cms/client/event/stages">Stages</NavLink></li>
													<li><NavLink to="/cms/client/event/tables">Tables</NavLink></li>
													<li><NavLink to="/cms/client/event/team">Team</NavLink></li>
													<li><NavLink to="/cms/client/event/myagenda">My Agenda</NavLink></li>
													<li>Registration</li>
													<li>Paygate</li>
													<li>Landing Page</li>
												</>
											)
											: null
										}
									</ul>
								</Typography>
							</AccordionDetails>
						</Accordion>

						{/*<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>Agenda</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									<ul style={{ listStyleType: "circle" }}>
										<li>Draft</li>
										<li>Locked</li>
										<li>Talks</li>
									</ul>
								</Typography>
							</AccordionDetails>
						</Accordion>*/}

						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>Chat &amp; Networking</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									<ul style={{ listStyleType: "circle" }}>
										<li>Toggle</li>
										<li>Time Restrictions</li>
										<li><NavLink to="/cms/client/truechat">{chatName}</NavLink></li>
										{eventId
											? (
												<li>
													<NavLink to="/cms/event/attendees">
														Attendees
													</NavLink>
												</li>
											)
											: null
										}
									</ul>
								</Typography>
							</AccordionDetails>
						</Accordion>

						{/*<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>Hall &amp; Exhibitors</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									<ul style={{ listStyleType: "circle" }}>
										<li>Manage</li>
									</ul>
								</Typography>
							</AccordionDetails>
						</Accordion>*/}

						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>Analytics</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									<ul style={{ listStyleType: "circle" }}>
										<li><NavLink to="/cms/client/analytics">Client Stats</NavLink></li>
									</ul>
								</Typography>
							</AccordionDetails>
						</Accordion>

						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>Billing</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									<ul style={{ listStyleType: "circle" }}>
										<li>Manage</li>
									</ul>
								</Typography>
							</AccordionDetails>
						</Accordion>

					</div>
				)
				: (<Redirect to="/" />)
			}


			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.heading}>My Profile</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						<ul style={{ listStyleType: "circle" }}>
							<li><NavLink to="/cms/myprofile">Manage</NavLink></li>
						</ul>
					</Typography>
				</AccordionDetails>
			</Accordion>

		</div>
	);
};


export default ClientNavLinks;