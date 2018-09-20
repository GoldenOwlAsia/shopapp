import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat
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
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    gender: {
      type: GraphQLString
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
    salary: {
      type: GraphQLFloat
    },
    fullName:{
      type: new GraphQLNonNull(GraphQLString)
    },
    avatar: {
      type: GraphQLString
    },
    bonus: {
      type: GraphQLFloat
    },
    note: {
      type: GraphQLString
    },
    CMND: {
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

export const UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  description: "This represent an input of an user",
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    gender: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
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
    salary: {
      type: GraphQLFloat
    },
    fullName:{
      type: GraphQLString
    },
    avatar: {
      type: GraphQLString
    },
    bonus: {
      type: GraphQLFloat
    },
    note: {
      type: GraphQLString
    },
    CMND: {
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
    },
    getStaffs: {
      type: new GraphQLList(UserType),
      description: 'Get all staffs',
      resolve: Controller.getStaffs
    },
    getUserById: {
      type: UserType,
      description: 'Get staff by id',
      args: {
        userId: { type: GraphQLInt }
      },
      resolve: Controller.getUserById
    },
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
        dateOfBirth: { type: GraphQLString },
        salary: { type: GraphQLFloat },
        fullName:{ type: GraphQLString },
        avatar: { type: GraphQLString },
        bonus: { type: GraphQLFloat },
        note: { type: GraphQLString },
        CMND: { type: GraphQLString },
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
        salary: { type: GraphQLFloat },
        fullName:{ type: GraphQLString },
        avatar: { type: GraphQLString },
        bonus: { type: GraphQLFloat },
        note: { type: GraphQLString },
        CMND: { type: GraphQLString },
      },
      resolve: Controller.createOwner
    },
    updateUserById: {
      type: UserType,
      description: 'update an user by id',
      args: {
        params: { type: UserInputType},
        userId: { type: GraphQLInt }
      },
      resolve: Controller.updateUserById
    }
  }
}
