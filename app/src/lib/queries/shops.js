import gql from 'graphql-tag';

const ShopQuery = gql`
  query {
    allShops {
      id,
      name,
      address,
      latitude,
      longitude
    }
  }
`

export default ShopQuery;