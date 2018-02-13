import rndId from 'rnd-id';
import camelCase from 'camel-case';
import pascalCase from 'pascal-case';
import forceArray from 'force-array';
import Get from 'lodash.get';
import keys from 'lodash.keys';
import gql from 'graphql-tag';

const ROOT = camelCase('--react-apollo-local-values');
const IDS = {};

export const mutation = () => ({
  setLocalValue: (_, { namespace, ...values }, { cache }) => {
    const typename = pascalCase(namespace);
    const id = IDS[typename] || `${typename}:${rndId()}`;

    if (!IDS[typename]) {
      IDS[typename] = id;
    }

    cache.writeData({
      data: {
        [namespace]: {
          ...values,
          id,
          __typename: typename
        }
      }
    });
  }
});

export default (namespace = ROOT) => {
  const _namespace = camelCase(namespace);

  const get = attrs => {
    const args = forceArray(attrs)
      .map(attr => camelCase(attr))
      .join('\n');

    return gql`
      query {
        ${namespace} @client {
          id
          ${args}
        }
      }
    `;
  };

  const resolve = ({ data }) => Get(data, `${_namespace}`, {});

  const set = (attrs = {}) => {
    const _attrs = keys(attrs).map(name => ({
      name: camelCase(name),
      type: pascalCase(attrs[name])
    }));

    const params = _attrs
      .map(({ name, type }) => `$${name}: ${type}`)
      .join(', ');

    const values = _attrs.map(({ name }) => `${name}: $${name}`).join(', ');

    return gql`
      mutation setLocalValue(${params}) {
        setLocalValue(namespace: "${_namespace}", ${values}) @client
      }
    `;
  };

  return { set, get, resolve };
};
