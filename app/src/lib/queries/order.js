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

export const RecentOrdersQuery = gql`
  query recentOrders {
    recentOrders {
      id,
      customer{
        name
      }
      grandTotal
      subTotal
      tax
      createdAt
      createdByStaff{
        firstName
        lastName
      }
      items {
        id
      }
    }
  }
`;