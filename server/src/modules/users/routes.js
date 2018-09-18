import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';

import Controller from './controller';

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represent an user",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    gender: {
      type: new GraphQLNonNull(GraphQLString)
    },
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    dateOfBirth: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    },
    phoneNumber: {
      type: GraphQLString
    },
    role: {
      type: GraphQLString
    },
    code: {
      type: GraphQLString
    }
  })
});

export default {
  query: {
    currentUser: {
      type: UserType,
      description: 'Get current user',
      args: {
        token: { type: GraphQLString }
      },
      resolve: Controller.getCurrentUser
    }
  },
  mutation: {
    createUser: {
      type: UserType,
      description: 'Create new user',
      args: {
        address: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString }
      },
      resolve: Controller.createUser
    },
    createOwner: {
      type: UserType,
      description: 'Create an owner',
      args: {
        address: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
      },
      resolve: Controller.createOwner
    }
  }
}
