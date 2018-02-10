import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import 'tachyons';

import Hello from './hello';
import Age from './age';
import client from './store';

window.__APOLLO_CLIENT__ = client;

ReactDOM.render(
  <ApolloProvider client={client}>
    <div className="helvetica pa5">
      <Hello />
      <Age />
    </div>
  </ApolloProvider>,
  document.getElementById('root')
);
