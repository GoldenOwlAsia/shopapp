import gql from 'graphql-tag';

export const GetNotifications = gql`
  query {
    notifications {
      id
      createdByStaff {
        id
        fullName
      }
      customer {
        id
        name
      }
      content
      order {
        id
        items {
          id
          image
          name
        }
      }
      type
      createdAt
    }
  }
`;