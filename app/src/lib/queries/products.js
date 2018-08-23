import gql from 'graphql-tag';

export const GetAllProducts = gql`
  query {
    products {
      id,
      name,
      category,
      price
    }
  }
`;