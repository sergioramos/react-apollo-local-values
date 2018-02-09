import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { mutation } from 'react-apollo-local-values';

const cache = new InMemoryCache();
const remote = new HttpLink({ uri: 'https://babel-plugins.now.sh/graphql' });

const local = withClientState({
  cache,
  resolvers: {
    Query: {},
    Mutation: {
      ...mutation()
    }
  }
});

export default new ApolloClient({
  addTypename: true,
  link: ApolloLink.from([local, remote]),
  connectToDevTools: true,
  cache
});
