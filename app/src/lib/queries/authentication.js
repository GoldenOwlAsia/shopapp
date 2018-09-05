import gql from 'graphql-tag';

export const Login = gql`
  mutation login ($username: String, $password: String) {
    login(username: $username, password: $password) {
      authToken
    }
  }
`;