import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';

let serverUrl = 'http://localhost:4000/graphql';
if (import.meta.env.VITE_GRAPHQL_URL && import.meta.env.PROD) {
    serverUrl = import.meta.env.VITE_GRAPHQL_URL as string;
}
const client = new GraphQLClient(serverUrl);
const sdk = getSdk(client);

export default sdk;
