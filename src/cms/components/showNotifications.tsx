import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
	Badge,
	Typography,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Chip,
	IconButton,
	Avatar
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { clientIdVar, userIdVar, eventIdVar } from '../../stores/cache';
import { useReactiveVar } from '@apollo/client';
import { listFavourites } from '../../graphql/queries';
import { adminGetUser } from '../../utils/cognitoService';
import { createMailTo } from '../../utils/createLink';
import { getStorage } from '../../utils/awsStorage';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { createFavourite } from '../../graphql/mutations';


interface Props {};


const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		maxWidth: 350,
		//width: '21rem',
		minHeight: 150,
		minWidth: 350
		/*'& > *': {
			margin: theme.spacing(1)
		}*/
	}
}));


const ShowNotifications: any = (props: Props) => {

	let userId: string = useReactiveVar(userIdVar);
	let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);

	const [notificationCount, setNotificationCount]: any = useState(0);
	const [awaitingConnects, setAwaitingConnects]: any = useState([]);
	const classes: any = useStyles();

	const getUnconnected: any = async () => {

		const rtnArr: string[] = [];
		let awaitingConnects: number = 0;

		/* start: get people wanting to connect */
		const params: any = {
			filter: {
				cognito_sub: {ne: null},
				client_id: {eq: clientId},
				event_id: {eq: eventId},
				attendee_cognito_sub: {eq: userId}
				/*, or: {
					cognito_sub: {eq: userId},
					client_id: {eq: clientId},
					event_id: {eq: eventId},
					attendee_cognito_sub: {attributeExists: false}
				}*/
			}
		};
		const result: any = await API.graphql(graphqlOperation( listFavourites, params ));
		const initiatedConnects: any[] = (result.data.listFavourites.items || []);
		//console.log('initiatedConnects:', initiatedConnects);
		/* end: get people wanting to connect */


		/* start: see if you're connected to them */
		for( let idx: number = 0; idx < initiatedConnects.length; idx++ ){
			const row: any = initiatedConnects[idx];
			const params2: any = {
				filter: {
					cognito_sub: {eq: userId},
					client_id: {eq: clientId},
					event_id: {eq: eventId},
					attendee_cognito_sub: {eq: row.cognito_sub}
				}
			};
			const result2: any = await API.graphql(graphqlOperation( listFavourites, params2 ));
			const existingConnects: any[] = (result2.data.listFavourites.items || []);
			//console.log('existingConnects:', existingConnects);

			if( !existingConnects.length ){
				rtnArr.push(row.cognito_sub);
				awaitingConnects++;
			}

		}
		/* end: see if you're connected to them */


		if( awaitingConnects ){ setNotificationCount(awaitingConnects); }

		return rtnArr;
	};

	const getCognitoUsers: any = async (cogSubs: string[]) => {
		const tmpAttendees: any[] = [];
		//console.log('cogSubs:', cogSubs);

		try{

			for( let idx: number = 0; idx < cogSubs.length; idx++ ){
				const sub: string = cogSubs[idx];
				try{
					const cogUser: any = await adminGetUser(sub);
					//console.log('cogUser:', cogUser);

					if( cogUser.Enabled ){
						const attributes: any = {
							sub: '',
							title: '',
							last_name: '',
							first_name: '',
							profile_img: '',
							job_title: '',
							email: ''
					   };

					   cogUser.UserAttributes.map((att: any) => {
							let _name: string = att.Name.replace('custom:', '');
							if( _name in attributes ){ attributes[_name] = att.Value; }
						});

						if( !attributes.first_name && !attributes.last_name && attributes.email ){
							attributes.first_name = attributes.email.split('@')[0];
						}

						if( attributes.first_name || attributes.last_name ){
							/* start: get storage from s3 */
							if( attributes.profile_img ){
								const getS3Obj: any = await getStorage(attributes.profile_img);
								if( getS3Obj.success ){ attributes.profile_img = getS3Obj.data; }
							}
							/* end: get storage from s3 */
							tmpAttendees.push(attributes);
						}
					}

				}catch( err: any ){}
			}
		}catch( err: any ){}
		//console.log('tmpAttendees:', tmpAttendees);
		if( tmpAttendees.length ){ setAwaitingConnects(tmpAttendees); }
	};

	const addToFaves: any = (attSub: string) => {
		const params: any = {
			input: {
				cognito_sub: userId,
				client_id: clientId,
				event_id: eventId,
				attendee_cognito_sub: attSub
			}
		};
		API.graphql(graphqlOperation( createFavourite, params ));
		//updateFaveSubs(attSub);

		/* start: filter out chosen awiting user */
		const newConnects: any[] = awaitingConnects.filter((row: any) => {
			return( row.sub !== attSub );
		});
		//console.log('newConnects:', newConnects);
		setAwaitingConnects(newConnects);
		/* end: filter out chosen awiting user */

	};

	const doAsyncs: any = async () => {
		const cogSubs: string[] = await getUnconnected();
		getCognitoUsers(cogSubs);
	};

	useEffect(() => {
		doAsyncs();
	}, []);

	return(
		<div className={classes.root}>

			{/*<Badge badgeContent={notificationCount} color="primary">
				<Typography>Your Notifications</Typography>
			</Badge>*/}

			<Badge badgeContent={awaitingConnects.length} color="primary">
				<Typography>Awaiting Connections</Typography>
			</Badge>

			<br /><br />

			{awaitingConnects.map((row: any, idx: number) => {
				let modulus: number = idx % 2;
				let person: string = '';
				if( row.title ){ person += row.title + '\xa0'; }
				if( row.first_name ){ person += row.first_name + '\xa0'; }
				if( row.last_name ){ person += row.last_name + '\xa0'; }
				if( row.job_title ){ person += '\n' + row.job_title; }
				//if( row.email ){ person += '\n' + createMailTo(row.email); }

				return(
					<div key={idx}>

						<Card className={classes.root} style={{ float: (modulus ? 'right' : 'left') }}>
							<CardActionArea>
								<CardContent>
									<span className="alignRight">
										{row.sub == userId
											? (<Chip color="primary" size="small" label="It`s you" />)
											: (
												<CardActions disableSpacing className="alignTop">
													<IconButton aria-label="Add connection" onClick={() => {addToFaves(row.sub);}}>
														<PersonAddOutlinedIcon />
													</IconButton>
												</CardActions>
											)
										}
									</span>
									<Avatar src={row.profile_img} alt={row.first_name} />
									<Typography component={'span'} style={{ whiteSpace: 'pre-wrap' }}>
										{person}<br />
										{createMailTo(row.email)}
									</Typography>
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

		</div>
	);

};


export default ShowNotifications;