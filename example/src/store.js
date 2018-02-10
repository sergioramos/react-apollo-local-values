import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { mutation } from 'react-apollo-local-values';

const cache = new InMemoryCache();

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
  link: local,
  cache
});
