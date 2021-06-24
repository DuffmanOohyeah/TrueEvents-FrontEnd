import { getLocalStorage } from '../stores/localStorage';
import { listEvents, listUserEventJoins } from '../graphql/queries';
import { createUserEventJoin } from '../graphql/mutations';
import API, { graphqlOperation } from '@aws-amplify/api';


let userId: string = getLocalStorage('userId');


const getClientEvents: any = async (clientId: string) => {
	const params: any = {
		filter: {
			client_id: {eq: clientId}
		}
	};
	const result: any = await API.graphql(graphqlOperation( listEvents, params ));
	const arr: any[] = (result.data.listEvents.items || []);
	const eventIds: string[] = [];

	arr.map((row: any) => {
		if( eventIds.indexOf(row.id) == -1 ){ eventIds.push(row.id); }
	});

	return eventIds;
};


const doEventJoins: any = async (clientId: string, eventIds: string[]) => {

	//console.log('eventIds:', eventIds);

	const joinParams: any = {
		filter: {
			cognito_sub: {eq: userId},
			client_id: {eq: clientId}
		}
	};

	const result: any = await API.graphql(graphqlOperation( listUserEventJoins, joinParams ));
	const joins: any[] = (result.data.listUserEventJoins.items || []);
	//console.log('joins:', joins);

	if( eventIds.length !== joins.length ){
		//console.log('two array lengths do not match');
		const joinEvtIds: string[] = [];

		joins.map((row: any) => {
			if( row.event && (joinEvtIds.indexOf(row.event.id) == -1) ){
				joinEvtIds.push(row.event.id);
			}
		});

		eventIds.filter((id: string) => {
			if( joinEvtIds.indexOf(id) == -1 ){
				const createParams: any = {
					input: {
						cognito_sub: userId,
						client_id: clientId,
						userEventJoinEventId: id
					}
				};
				API.graphql(graphqlOperation( createUserEventJoin, createParams ));
			}
		});
	}

};


const addEventJoins: any = async (clientId: string) => {
	const eventIds: string[] = await getClientEvents(clientId);
	doEventJoins(clientId, eventIds);
};


export { addEventJoins };