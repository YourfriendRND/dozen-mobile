import { GraphQLClient } from 'graphql-request';
import Constants from 'expo-constants';

const serverUrl = Constants?.expoConfig?.extra?.API_URL;

export const graphqlClient = new GraphQLClient(`${serverUrl}/graphql`, {
    headers: {
        'Content-Type': 'application/json'
    }
});
