import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import Navigation from './navigation';
import Dashboard from './dashboard';
import CoreUsers from './core/users/index';
import CoreClients from './core/clients/index';
import CoreSettings from './core/settings/index';
import CoreClientTbls from './core/clientTbls/index';
import ClientEventSetup from './client/event/setup/index';
import ClientEventSessions from './client/event/sessions/index';
import ClientEventHalls from './client/event/halls/index';
import ClientEventPresenters from './client/event/presenters/index';
import ClientEventStages from './client/event/stages/index';
import ClientEventTables from './client/event/tables/index';
import ClientEventTeam from './client/event/team/index';
import ClientEventWebinars from './client/event/webinars/index';
import MyAgenda from './client/event/myAgenda/index';
import TrueChat from './client/truechat/index';
import Analytics from './client/analytics/index';
import EventCompletionStats from './client/event/completionStats/index';
import MyProfile from './myProfile/index';
import Attendees from './client/event/attendees/index';
import { userIdVar, clientIdVar, eventIdVar, userRolesVar } from '../../stores/cache';
import { useReactiveVar } from '@apollo/client';
import { Button, Drawer, Grid, Paper, Box } from '@material-ui/core';
import { listUserEventJoins } from '../../graphql/queries';


interface Props {};

type Anchor = 'right';


const Cms: any = (props: Props) => {

	let userId: string = useReactiveVar(userIdVar);
	let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);
	const userRoles: string = useReactiveVar(userRolesVar);

	const [state, setState]: any = useState({ right: false });
	const [evtGroups, setEvtGroups]: any = useState([]);

	const toggleDrawer: any = (anchor: Anchor, open: boolean) => ( event: React.KeyboardEvent | React.MouseEvent ) => {
		if( event.type === 'keydown' && (
				(event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift'
			)
		){ return; }
		setState({ ...state, [anchor]: open });
	};

	const getEvtJoins: any = async () => {
		const params: any = {
			filter: {
				cognito_sub: {eq: userId},
				client_id: {eq: clientId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listUserEventJoins, params ));
		//console.log('getEvtJoins:', result);

		const tmpGrps: string[] = [];

		result.data.listUserEventJoins.items.map((join: any) => {
			join.groups.items.map((grp: any) => {
				tmpGrps.push(grp.name);
			});
		});

		//console.log('tmpGrps:', tmpGrps);

		if( tmpGrps.length ){ setEvtGroups(tmpGrps); }
	};

	useEffect(() => {
		getEvtJoins();
	}, []);

	return(
		<Grid container spacing={3}>
			<Grid item xl={3}>
				<Box p={2}>
					<Paper elevation={5}>
						<Box p={2} style={{background: "#fad8e1"}}>
							<Navigation {...props} />
						</Box>
					</Paper>
				</Box>
			</Grid>
			<Grid item xl={9} style={{width: 800}}>
				<Box p={2}>


					{/* start: core routes */}
					<Route path="/cms/core/users/:id?"
						render={(props) => (<CoreUsers key={Math.random()} {...props} />)}
						key={Math.random()} />
					<Route path="/cms/core/clients/:id?"
						render={(props) => (<CoreClients key={Math.random()} {...props} />)}
						key={Math.random()} />
					<Route path="/cms/core/settings/:id?"
						render={(props) => (<CoreSettings key={Math.random()} {...props} />)}
						key={Math.random()} />
					<Route path="/cms/core/clientTbls/:id?"
						render={(props) => (<CoreClientTbls key={Math.random()} {...props} />)}
						key={Math.random()} />
					{/* end: core routes */}

					{/* start: event routes */}
					<Route path="/cms/client/event/setup/:id?"
						render={(props) => (<ClientEventSetup key={Math.random()} {...props} />)}
						key={Math.random()} />
					<Route path="/cms/client/event/sessions/:id?"
						render={(props) => (<ClientEventSessions key={Math.random()} {...props} />)}
						key={Math.random()} />
					<Route path="/cms/client/event/halls/:id?"
						render={(props) => (<ClientEventHalls key={Math.random()} {...props} />)}
						key={Math.random()} />
					<Route path="/cms/client/event/presenters/:id?"
						render={(props) => (<ClientEventPresenters key={Math.random()} {...props} />)}
						key={Math.random()} />
					<Route path="/cms/client/event/stages/:id?"
						render={(props) => (<ClientEventStages key={Math.random()} {...props} />)}
						key={Math.random()} />
					<Route path="/cms/client/event/tables/:id?"
						render={(props) => (<ClientEventTables key={Math.random()} {...props} />)}
						key={Math.random()} />
					<Route path="/cms/client/event/team/:id?"
						render={(props) => (<ClientEventTeam key={Math.random()} {...props} />)}
						key={Math.random()} />
					<Route path="/cms/client/event/myagenda"
						render={(props) => (<MyAgenda key={Math.random()} {...props} />)}
						key={Math.random()} />

					<Route path="/cms/client/event/webinars/:id?"
						render={(props) => (<ClientEventWebinars key={Math.random()} {...props} />)}
						key={Math.random()} />
					{/* end: event routes */}

					{/* start: client routes */}
					<Route path="/cms/client/truechat"
						render={(props) => (<TrueChat key={Math.random()} {...props} />)}
						key={Math.random()} />

					<Route path="/cms/client/analytics"
						render={(props) => (<Analytics key={Math.random()} {...props} />)}
						key={Math.random()} />
					{/* end: client routes */}

					{/* start: misc routes */}
					<Route exact path="/cms/myprofile"
						render={(props) => (<MyProfile key={Math.random()} {...props} />)}
						key={Math.random()} />

					<Route exact path="/cms/event/attendees"
						render={(props) => (<Attendees key={Math.random()} {...props} />)}
						key={Math.random()} />

					<Route exact path="/"
						render={(props) => (<Dashboard key={Math.random()} {...props} />)}
						key={Math.random()} />
					{/* end: misc routes */}


				</Box>
			</Grid>
			{clientId && eventId &&
				(
					userRoles.indexOf('Admin') > -1 ||
					userRoles.indexOf('SuperAdmin') > -1 ||
					evtGroups.indexOf('EventAdmin') > -1
				)
				? (<div>
					{(['right'] as Anchor[]).map((anchor: any) => (
						<Grid item xl={3}>
							<Box p={2}>
								<Paper elevation={5}>
									<Box p={2}>

										<React.Fragment key={anchor}>
											<Button onClick={toggleDrawer(anchor, true)}>
												Event Stats
											</Button>
											<Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
												<EventCompletionStats {...props} />
											</Drawer>
										</React.Fragment>

									</Box>
								</Paper>
							</Box>
						</Grid>
					))}
				</div>)
				: null
			}
		</Grid>
	);

};


export default Cms;