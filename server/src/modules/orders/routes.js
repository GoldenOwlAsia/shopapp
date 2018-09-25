import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

import Controller from './controller';
import { CustomerType } from '../customers/routes';
import { UserType } from '../users/routes';
import { ProductInputType } from '../products/routes';

const OrderItemType = new GraphQLObjectType({
  name: 'OrderItem',
  description: "this repersent an item in order",
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    category: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLFloat,
    },
    quantity: {
      type: GraphQLInt
    },
    image: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    }
  })
});

const OrderItemInputType = new GraphQLInputObjectType({
  name: 'OrderItemInput',
  description: "this repersent an input of item in order",
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    category: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLFloat,
    },
    quantity: {
      type: GraphQLInt
    },
    image: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    }
  })
})

const OrderType = new GraphQLObjectType({
  name: "Order",
  description: "This represent an order",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    createdByStaff: {
      type: UserType
    },
    customer: {
      type: CustomerType
    },
    items: {
      type: new GraphQLList(OrderItemType)
    },
    subTotal: {
      type: GraphQLFloat
    },
    tax: {
      type: GraphQLFloat
    },
    grandTotal: {
      type: GraphQLFloat
    }
  })
});

export default {
  query: {
    orders: {
      type: new GraphQLList(OrderType),
      description: 'Get all customer',
      resolve: Controller.getOrders
    },
    recentOrders: {
      type: new GraphQLList(OrderType),
      description: 'Get orders recently',
      resolve: Controller.getRecentOrders
    }
  },
  mutation: {
    checkout: {
      type: OrderType,
      description: 'Create new order for storage',
      args: {
        items: { type: new GraphQLList(ProductInputType) },
        subTotal: { type: GraphQLFloat },
        tax: { type: GraphQLFloat },
        grandTotal: { type: GraphQLFloat },
        createdBy: { type: GraphQLInt },
        customerId: { type: GraphQLInt },
      },
      resolve: Controller.createOrder
    }
  }
}
