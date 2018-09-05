import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';

import Controller from './controller';

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  description: "This represent an customer",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    dateOfBirth: {
      type: GraphQLString
    },
    gender: {
      type: new GraphQLNonNull(GraphQLString)
    },
    address: {
      type: GraphQLString
    },
    phoneNumber: {
      type: GraphQLString
    }
  })
});

export default {
  query: {
    customers: {
      type: new GraphQLList(CustomerType),
      description: 'Get all customer',
      resolve: Controller.getCustomers
    },
    getCustomerById: {
      type: CustomerType,
      description: 'Get customer by id',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (_, args) => Controller.getCustomerById(args)
    }
  },
  mutation: {
    createCustomer: {
      type: CustomerType,
      description: 'Create new customer',
      args: {
        name: { type: GraphQLString },
        // dateOfBirth: { type: GraphQLString },
        // gender: { type: GraphQLString },
        // address: { type: GraphQLString },
        phoneNumber: { type: GraphQLString }
      },
      resolve: (_, args) => Controller.createCustomer(args)
    }
  }
}
