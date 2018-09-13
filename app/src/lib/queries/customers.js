import gql from 'graphql-tag';

export const CreateCustomer = gql`
  mutation createCustomer($name: String, $phoneNumber: String) {
    createCustomer(name: $name, phoneNumber: $phoneNumber) {
      id,
      name,
      phoneNumber
    }
  }
`;

export const UpdateCustomer = gql`
  mutation updateCustomer($name: String, $phoneNumber: String, $id: Int) {
    updateCustomer(name: $name, phoneNumber: $phoneNumber, id: $id) {
      name
      phoneNumber
      id
    }
  }
`;