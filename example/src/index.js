import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';

import Hello from './hello';
import Age from './age';
import client from './store';

window.__APOLLO_CLIENT__ = client;

ReactDOM.render(
  <ApolloProvider client={client}>
    <Fragment>
      <Hello />
      <Age />
    </Fragment>
  </ApolloProvider>,
  document.getElementById('root')
);
