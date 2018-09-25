import gql from 'graphql-tag';

export const GetAllStaffs = gql`
  query {
    getStaffs {
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
      createdAt
      soldProducts
      revenue
    }
  }
`;