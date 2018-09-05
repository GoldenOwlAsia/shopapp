import gql from 'graphql-tag';

export const Login = gql`
  mutation login ($username: String, $password: String) {
    login(username: $username, password: $password) {
      authToken
    }
  }
`;

export const CreateCustomer = gql`
  mutation createCustomer($name: String, $phoneNumber: String) {
    createCustomer(name: $name, phoneNumber: $phoneNumber) {
      id,
      name,
      phoneNumber
    }
  }
`;