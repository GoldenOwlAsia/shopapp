import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql';

import Controller from './authController';
import { UserType } from '../users/routes';

const AuthenticationType = new GraphQLObjectType({
  name: "Authentication",
  description: "Authentication describle",
  fields: () => ({
    authToken: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

export default {
  query: {},
  mutation: {
    login: {
      type: AuthenticationType,
      description: 'Login',
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: Controller.login
    },
    ownerLogin: {
      type: AuthenticationType,
      description: 'Owner login api',
      args: {
        code: { type: GraphQLString }
      },
      resolve: Controller.ownerLogin
    },
    logout: {
      type: AuthenticationType,
      description: 'Logout',
      args: {
        token: { type: GraphQLString },
      },
      resolve: Controller.logout
    }
  }
}
