import React from 'react';
import { graphql, compose } from 'react-apollo';
import Values from 'react-apollo-local-values';

// eslint-disable-next-line new-cap
const { set, get, resolve } = Values('hello');

const Hello = ({ name, onNameChange }) => (
  <form class="pa4 black-80">
    <div class="measure">
      <label htmlFor="name" class="f6 b db mb2">
        Name <span class="normal black-60">(optional)</span>
      </label>
      <input
        id="name"
        onChange={ev => onNameChange(ev.target.value)}
        class="input-reset ba b--black-20 pa2 mb2 db w-100"
        type="text"
        aria-describedby="name-desc"
      />
      {name ? (
        <small id="name-desc" class="f6 black-60 db mb2">
          Your name is: {name}
        </small>
      ) : null}
    </div>
  </form>
);

export default compose(
  graphql(
    set({
      name: 'String'
    }),
    {
      props: ({ mutate }) => ({
        onNameChange: (name = '') => mutate({ variables: { name } })
      })
    }
  ),
  graphql(get('name'), {
    props: resolve
  })
)(Hello);
