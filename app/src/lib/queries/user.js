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

export const UpdateUserById = gql`
  mutation updateUserById($params: UserInput, $userId: Int!){
    updateUserById(params: $params, userId: $userId) {
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

export const CreateUser = gql`
  mutation createUser($address: String, $phoneNumber: String, $firstName: String, $lastName: String, $username: String, $password: String, $dateOfBirth: String, $salary: Float, $fullName: String, $avatar: String, $bonus: Float, $note: String, $CMND: String){
    createUser(address: $address, phoneNumber: $phoneNumber, firstName: $firstName, lastName: $lastName, username: $username, password: $password, dateOfBirth: $dateOfBirth, salary: $salary, fullName: $fullName, avatar: $avatar, bonus: $bonus, note: $note, CMND: $CMND) {
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