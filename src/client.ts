import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';

const client = new GraphQLClient('http://localhost:4000/graphql');
const sdk = getSdk(client);

export default sdk;
