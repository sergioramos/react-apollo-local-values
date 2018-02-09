import React from 'react';
import { graphql, compose } from 'react-apollo';
import Values from 'react-apollo-local-values';

// eslint-disable-next-line new-cap
const { set, get, resolve } = Values('hello');

const Hello = ({ age, name, onAgeChange }) => (
  <form>
    <p>{name}</p>
    <p>{age}</p>
    <input type="number" onChange={ev => onAgeChange(ev.target.value)} />
  </form>
);

export default compose(
  graphql(set('age'), {
    props: ({ mutate }) => ({
      onAgeChange: (age = '') => mutate({ variables: { age } })
    })
  }),
  graphql(get(['age', 'name']), {
    props: resolve
  })
)(Hello);
