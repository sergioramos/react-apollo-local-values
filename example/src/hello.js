import React from 'react';
import { graphql, compose } from 'react-apollo';
import Values from 'react-apollo-local-values';

// eslint-disable-next-line new-cap
const { set, get, resolve } = Values('hello');

const Hello = ({ name, age, onNameChange }) => (
  <form>
    <p>{name}</p>
    <p>{age}</p>
    <input onChange={ev => onNameChange(ev.target.value)} />
  </form>
);

export default compose(
  graphql(set('name'), {
    props: ({ mutate }) => ({
      onNameChange: (name = '') => mutate({ variables: { name } })
    })
  }),
  graphql(get('name'), {
    props: resolve
  }),
  graphql(get('age'), {
    props: resolve
  })
)(Hello);
