import { gql } from '@apollo/client';


const GET_JOIN_ID: any = gql`
	query( $filter: ModelUserEventJoinFilterInput ){
		listUserEventJoins( filter: $filter ){
			items {
				id
			}
		}
	}
`;


export {
	GET_JOIN_ID
};