import gql from 'graphql-tag';

export const Checkout = gql`
  mutation checkout($items: [OrderItemInput], $subTotal:Float,$tax:Float,$grandTotal:Float,$createdBy:Int,$customerId: Int) {
    checkout(items:$items,subTotal:$subTotal,tax:$tax,grandTotal:$grandTotal,createdBy:$createdBy,customerId:$customerId) {
      items {
        id
      },
      id,
      customer{
        id,
        name,
        phoneNumber
      },
      createdByStaff{
        id,
        username
      }
    }
  }
`;