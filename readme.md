# react-apollo-local-values

[![npm](https://img.shields.io/npm/v/react-apollo-local-values.svg?style=flat-square)](https://www.npmjs.com/package/react-apollo-local-values)
[![License: BSD 3-clause "New" or "Revised" License](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg?style=flat-square)](https://opensource.org/licenses/BSD-3-Clause)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

[![David](https://img.shields.io/david/ramitos/react-apollo-local-values.svg?style=flat-square)](https://david-dm.org/ramitos/react-apollo-local-values)
[![David](https://img.shields.io/david/dev/ramitos/react-apollo-local-values.svg?style=flat-square)](https://david-dm.org/ramitos/react-apollo-local-values?type=dev)
[![David](https://img.shields.io/david/peer/ramitos/react-apollo-local-values.svg?style=flat-square)](https://david-dm.org/ramitos/react-apollo-local-values?type=peer)

## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [License](#license)

## Install

```
yarn add react-apollo-local-values
```

```
npm install react-apollo-local-values
```

## Usage

_to combine with [apollo-link-state](https://github.com/apollographql/apollo-link-state)_

```js
import React from 'react';
import { graphql, compose } from 'react-apollo';
import Values from 'react-apollo-local-values';

const { set, get, resolve } = Values('my-namespace');

const Hello = ({ name, age, onNameChange, onAgeChange }) => (
  <form>
    <p>{name}</p>
    <p>{age}</p>
    <input type="text" onChange={ev => onNameChange(ev.target.value)} />
    <input type="number" onChange={ev => onAgeChange(ev.target.value)} />
  </form>
);

export default compose(
  graphql(
    set({
      name: 'String',
      age: 'Number'
    }),
    {
      props: ({ mutate }) => ({
        onNameChange: (name = '') => mutate({ variables: { name } }),
        onAgeChange: (age = 0) => mutate({ variables: { age } })
      })
    }
  ),
  graphql(get('name', 'age'), {
    props: resolve
  })
)(Hello);
```

## License

BSD-3-Clause
