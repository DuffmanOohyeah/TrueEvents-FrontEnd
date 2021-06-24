import { API, graphqlOperation } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { CardActions, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { userIdVar, clientIdVar } from '../stores/cache';
import { listFavourites, listUserEventJoins } from '../graphql/queries';
import { createFavourite, deleteFavourite, createUserEventJoin, deleteUserEventJoin } from '../graphql/mutations';


interface Props {
	eventId: string;
	sessionId?: any;
	presenterId?: any;
};


const FaveIcons: any = (props: Props) => {

	let userId: string = useReactiveVar(userIdVar);
	let clientId: string = useReactiveVar(clientIdVar);
	let sessionId: string = (props.sessionId || null);
	let presenterId: string = (props.presenterId || null);

	const [favouriteId, setFavouriteId]: any = useState('');
	const [evtJoinId, setEvtJoinId]: any = useState('');

	const isFaved: any = async () => {
		const params: any = {
			filter: {
				cognito_sub: {eq: userId},
				client_id: {eq: clientId},
				event_id: {eq: props.eventId},
				session_id: {eq: sessionId},
				presenter_id: {eq: presenterId}
			}
		};

		const result: any = await API.graphql(graphqlOperation( listFavourites, params ));
		//console.log('result:', result);
		if( result.data.listFavourites.items.length ){
			setFavouriteId(result.data.listFavourites.items[0].id);
		}
	};

	const addToFaves: any = async (evt: any) => {
		evt.preventDefault();


		/* start: add to join table */
		if( !evtJoinId ){
			const joinParams: any = {
				input: {
					cognito_sub: userId,
					client_id: clientId,
					userEventJoinEventId: props.eventId
				}
			};
			API.graphql(graphqlOperation( createUserEventJoin, joinParams ));
		}
		/* end: add to join table */


		/* start: add to faves table */
		const params: any = {
			input: {
				cognito_sub: userId,
				client_id: clientId,
				event_id: props.eventId,
				session_id: sessionId,
				presenter_id: presenterId
			}
		};
		const result: any = await API.graphql(graphqlOperation( createFavourite, params ));
		//console.log('result:', result);
		if( result.data.createFavourite ){
			setFavouriteId(result.data.createFavourite.id);
		}
		/* end: add to faves table */
	};

	const removeFromFaves: any = (evt: any) => {
		evt.preventDefault();

		/* start: delete from join table */
		if( evtJoinId ){
			const joinParams: any = {
				input: {id: evtJoinId}
			};
			API.graphql(graphqlOperation( deleteUserEventJoin, joinParams ));
		}
		/* end: delete from join table */

		/* start: delete from faves table */
		if( favouriteId ){
			const params: any = {
				input: {id: favouriteId}
			};
			API.graphql(graphqlOperation( deleteFavourite, params ));
			setFavouriteId('');
		}
		/* end: delete from faves table */
	};

	const getEventJoin: any = async () => {
		const params: any = {
			filter: {
				cognito_sub: {eq: userId},
				client_id: {eq: clientId}
			}
		};
		const result: any = await API.graphql(graphqlOperation( listUserEventJoins, params ));
		//console.log('result:', result);

		const arr: any[] = (result.data.listUserEventJoins.items || []);

		for( let idx: number = 0; idx < arr.length; idx++ ){
			const row: any = arr[idx];
			if( row.event && row.event.id == props.eventId ){
				setEvtJoinId(row.id);
				break;
			}
		}

	};

	useEffect(() => {
		isFaved();
		getEventJoin();
	}, []);

	return(
		<>
			<CardActions disableSpacing>
				{favouriteId
					? (
						<IconButton aria-label="Remove from favorites" onClick={removeFromFaves}>
							<FavoriteIcon />
						</IconButton>
					)
					: (
						<IconButton aria-label="Add to favorites" onClick={addToFaves}>
							<FavoriteBorderIcon />
						</IconButton>
					)
				}
			</CardActions>
		</>
	);

};


export default FaveIcons;