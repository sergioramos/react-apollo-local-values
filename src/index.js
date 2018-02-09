import uuid from 'uuid/v4';
import camelCase from 'camel-case';
import pascalCase from 'pascal-case';
import forceArray from 'force-array';
import Get from 'lodash.get';
import gql from 'graphql-tag';

const ROOT = camelCase('--react-apollo-local-values');
const ID = uuid();

export const mutation = () => ({
  setLocalValue: (_, { namespace, ...values }, { cache }) => {
    const typename = pascalCase(namespace);

    cache.writeData({
      data: {
        [namespace]: {
          ...values,
          id: `${typename}:${ID}`,
          __typename: typename
        }
      }
    });
  }
});

export default (namespace = ROOT) => {
  const _namespace = camelCase(namespace);

  const get = attrs => gql`
    ${namespace} @client {
      id
      ${forceArray(attrs)
        .map(attr => camelCase(attr))
        .join('\n')};
    }
  `;

  // eslint-disable-next-line new-cap
  const resolve = ({ data }) => Get(data, `${_namespace}`, {});

  const set = (attr, type = 'string') => {
    const _attr = camelCase(attr);
    const _type = pascalCase(type);

    return gql`
      mutation setLocalValue($namespace: String, $${_attr}: ${_type}!) {
        setLocalValue(namespace: ${_namespace}, ${_attr}: $${_attr}) @client
      }
    `;
  };

  return { set, get, resolve };
};
