import awsmobile from "../aws-exports";
import {AUTH_TYPE, AuthOptions, createAuthLink} from "aws-appsync-auth-link";
import {createSubscriptionHandshakeLink} from "aws-appsync-subscription-link";
import {ApolloClient, ApolloLink, InMemoryCache} from "@apollo/client";
import {Auth} from "aws-amplify";

const jwtConfig : {
    url: string,
    region:string,
    auth: AuthOptions,
} = {
    url : awsmobile.aws_appsync_graphqlEndpoint,
    region : awsmobile.aws_appsync_region,
    auth : {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
    }
}
const apiConfig : {
    url: string,
    region:string,
    auth: AuthOptions,
} = {
    url : awsmobile.aws_appsync_graphqlEndpoint,
    region : awsmobile.aws_appsync_region,
    auth : {
        type: AUTH_TYPE.API_KEY,
        apiKey: awsmobile.aws_appsync_apiKey
    }
}

const jwtAuthLink = createAuthLink(jwtConfig);
const jwtSubscriptionLink = createSubscriptionHandshakeLink(jwtConfig);

const apiAuthLink = createAuthLink(apiConfig);
const apiSubscriptionLink = createSubscriptionHandshakeLink(apiConfig);

const authLink = ApolloLink.split(operation=> operation.getContext().auth === "API",apiAuthLink,jwtAuthLink);
const SubscriptionLink = ApolloLink.split(operation=> operation.getContext().auth === "API",apiSubscriptionLink,jwtSubscriptionLink);

const client = new ApolloClient({
    link: ApolloLink.from([
        authLink,
        SubscriptionLink
    ]),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery:{
            fetchPolicy: 'cache-and-network'
        }
    },
    connectToDevTools: true
})

export default client;
