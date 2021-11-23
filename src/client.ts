import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Log any GraphQL errors or network error that occurred
// const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors)
//         // this will handle query/mutation errors
//         graphQLErrors.forEach(({ name, message, locations, path }) =>
//             toast.error(`[GraphQL error]: Message: ${message}`)
//         );
//     if (networkError) toast.error(`[Network error]: ${networkError}`);
// });

const client = new ApolloClient({
    link: new HttpLink({ uri: `http://localhost:4000/graphql` }),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export default client;

// https://www.apollographql.com/blog/tooling/apollo-codegen/typescript-graphql-code-generator-generate-graphql-types/
