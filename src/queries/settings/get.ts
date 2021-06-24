import { gql } from '@apollo/client';


const GET_SETTING: any = gql`
	query( $filter: ModelSettingFilterInput ){
		listSettings( filter: $filter ){
			items {
				value
			}
		}
	}
`;


export {
	GET_SETTING
};