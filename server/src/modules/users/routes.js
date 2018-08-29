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
    dateOfBirth: {
      type: GraphQLString
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
  query: {},
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
      resolve: (_, args) => Controller.createUser(args)
    }
  }
}
