import gql from 'graphql-tag';

export const Checkout = gql`
  mutation checkout($items: [ProductInput], $subTotal:Float,$tax:Float,$grandTotal:Float,$createdBy:Int,$customerId: Int) {
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

export const RecentOrders = gql`
  query {
    recentOrders {
      id
      createdByStaff {
        id
        fullName
      }
      customer {
        id
        name
      }
      items {
        id
        name
        image
      }
      subTotal
      tax
      grandTotal
      createdAt
    }
  }
`;