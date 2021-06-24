import { useState, useEffect } from 'react';
import { clientIdVar, userIdVar, eventIdVar } from '../../../../../stores/cache';
import { API, graphqlOperation } from 'aws-amplify';
import { useReactiveVar } from '@apollo/client';
import CmsBreadcrumb from '../../../../../utils/cmsBreadcrumb';
import CmsHeader from '../../../../../utils/cmsHeader';
import { listUserEventJoins, listFavourites } from '../../../../../graphql/queries';
import { createFavourite, deleteFavourite } from '../../../../../graphql/mutations';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
	Chip,
	IconButton,
	Avatar
} from '@material-ui/core';
//import FavoriteIcon from '@material-ui/icons/Favorite';
//import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
//import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { adminGetUser } from '../../../../../utils/cognitoService';
import { createMailTo } from '../../../../../utils/createLink';
import { getStorage } from '../../../../../utils/awsStorage';


interface Props {};


const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		maxWidth: 350,
		//width: '21rem',
		minHeight: 150,
		minWidth: 350
	}
}));


const Attendees: any = (props: Props) => {

	let userId: string = useReactiveVar(userIdVar);
	let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);
	const classes: any = useStyles();
	const [attendees, setAttendees]: any = useState([]);
	const [faveSubs, setFaveSubs]: any = useState([]);

	const getEvtJoins: any = async () => {
		const params: any = {
			filter: {
				client_id: {eq: clientId}
			}
		};
		const result: any = await API.graphql(graphqlOperation( listUserEventJoins, params ));
		//console.log('getEvtJoins:', result);
		const joins: any[] = (result.data.listUserEventJoins.items || []);

		const tmpSubs: string[] = [];

		joins.map((join: any) => {
			if( join.event && join.event.id == eventId ){
				if( tmpSubs.indexOf(join.cognito_sub) == -1 /*&& join.cognito_sub !== userId*/ ){
					tmpSubs.push(join.cognito_sub);
				}
			}
		});

		//if( tmpSubs.length ){ setCognitoSubs(tmpSubs); }

		return tmpSubs;
	};

	const getCognitoUsers: any = async (cogSubs: string[]) => {
		//console.log('cogSubs:', cogSubs);
		const tmpAttendees: any[] = [];

		for( let idx: number = 0; idx < cogSubs.length; idx++ ){
			try{
				const result: any = await adminGetUser(cogSubs[idx]);
				//console.log('result:', result);
				if( result.Enabled ){

					const attributes: any = {
						sub: '',
						title: '',
						last_name: '',
						first_name: '',
						profile_img: '',
						job_title: '',
						email: ''
				   };

					result.UserAttributes.map((att: any) => {
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
			}catch( err: any ){
				//console.log('err:', err.message);
			}
		}

		if( tmpAttendees.length ){ setAttendees(tmpAttendees); }
		//console.log('tmpAttendees:', tmpAttendees);
	};

	const getFaves: any = async () => {
		const params: any = {
			filter: {
				cognito_sub: {eq: userId},
				client_id: {eq: clientId},
				event_id: {eq: eventId},
				attendee_cognito_sub: {attributeExists: true}
			}
		};
		const result: any = await API.graphql(graphqlOperation( listFavourites, params ));
		const faves: any[] = (result.data.listFavourites.items || []);
		//console.log('getFaves:', faves);

		const tmpAttendeeSubs: string[] = [];

		faves.map((fave: any) => {
			if( tmpAttendeeSubs.indexOf(fave.attendee_cognito_sub) == -1 ){
				tmpAttendeeSubs.push(fave.attendee_cognito_sub);
			}
		});

		//console.log('tmpAttendeeSubs:', tmpAttendeeSubs);

		if( tmpAttendeeSubs.length ){ setFaveSubs(tmpAttendeeSubs); }
	};

	const updateFaveSubs: any = (value: string) => {
		const newFaves: string[] = [...faveSubs];
		newFaves.push(value);
		//console.log('updateFaveSubs:', newFaves);
		setFaveSubs(newFaves);
	};

	const removeFaveSubs: any = (value: string) => {
		const newFaves: string[] = [];
		faveSubs.map((fave: string) => {
			if( fave !== value ){ newFaves.push(fave); }
		});
		//console.log('removeFaveSubs:', newFaves);
		setFaveSubs(newFaves);
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
		updateFaveSubs(attSub);
	};

	const removeFromFaves: any = async (attSub: string) => {
		let faveId: string = '';

		/* start: get fave id */
		const params: any = {
			filter: {
				cognito_sub: {eq: userId},
				client_id: {eq: clientId},
				event_id: {eq: eventId},
				attendee_cognito_sub: {eq: attSub}
			}
		};
		const result: any = await API.graphql(graphqlOperation( listFavourites, params ));
		const faves: any[] = (result.data.listFavourites.items || []);
		if( faves.length ){ faveId = faves[0].id; }
		/* end: get fave id */

		if( faveId ){
			const delParams: any = {
				input: {id: faveId}
			};
			API.graphql(graphqlOperation( deleteFavourite, delParams ));
		}
		removeFaveSubs(attSub);
	};

	const doAsyncs: any = async () => {
		const cogSubs: string[] = await getEvtJoins();
		getCognitoUsers(cogSubs);
	};

	useEffect(() => {
		doAsyncs();
		getFaves();
	}, []);

	return(
		<div>

			<CmsBreadcrumb section="Event" page="Attendees" />
			<CmsHeader /><br />

			{attendees.map((row: any, idx: number) => {
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
													{faveSubs.indexOf(row.sub) > -1
														? (
															<IconButton aria-label="Remove connection" onClick={() => {removeFromFaves(row.sub);}}>
																<PersonAddIcon />
															</IconButton>
														)
														: (
															<IconButton aria-label="Add connection" onClick={() => {addToFaves(row.sub);}}>
																<PersonAddOutlinedIcon />
															</IconButton>
														)
													}
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


export default Attendees;