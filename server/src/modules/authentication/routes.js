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
    token: {
      type: new GraphQLNonNull(GraphQLString)
    },
    user: { type: UserType }
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
      resolve: (_, args) => Controller.login(args)
    },
    logout: {
      type: AuthenticationType,
      description: 'Logout',
      args: {
        token: { type: GraphQLString },
      },
      resolve: (_, args) => Controller.logout(args)
    }
  }
}
