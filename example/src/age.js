import React from 'react';
import { graphql, compose } from 'react-apollo';
import Values from 'react-apollo-local-values';

// eslint-disable-next-line new-cap
const { set, get, resolve } = Values('hello');

const Hello = ({ age, onAgeChange }) => (
  <form class="pa4 black-80">
    <div class="measure">
      <label htmlFor="age" class="f6 b db mb2">
        Age <span class="normal black-60">(optional)</span>
      </label>
      <input
        id="age"
        onChange={ev => onAgeChange(ev.target.value)}
        class="input-reset ba b--black-20 pa2 mb2 db w-100"
        type="number"
        aria-describedby="age-desc"
      />
      {age ? (
        <small id="age-desc" class="f6 black-60 db mb2">
          Your age is: {age}
        </small>
      ) : null}
    </div>
  </form>
);

export default compose(
  graphql(set({ age: 'Number' }), {
    props: ({ mutate }) => ({
      onAgeChange: (age = 0) => mutate({ variables: { age } })
    })
  }),
  graphql(get('age'), {
    props: resolve
  })
)(Hello);
