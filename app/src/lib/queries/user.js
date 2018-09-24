import gql from 'graphql-tag';

export const GetUserById = gql`
  query getUserById($userId: Int!){
    getUserById(userId: $userId) {
      id
      firstName
      lastName
      gender
      username
      dateOfBirth
      address
      phoneNumber
      salary
      fullName
      avatar
      bonus
      note
      CMND
      role
      code
    }
  }
`;