import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql');
const sdk = getSdk(client);

export default sdk;
