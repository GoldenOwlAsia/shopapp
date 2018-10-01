import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';

import { CustomerType } from '../customers/routes';
import { UserType } from '../users/routes';

import Controller from './controller';

const NotificationType = new GraphQLObjectType({
  name: "Notification",
  description: "This represent a notification",
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
    content: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    }
  })
});

export default {
  query: {
    notifications: {
      type: new GraphQLList(NotificationType),
      description: 'List notifications',
      resolve: Controller.getNotifications
    },
  },
  mutation: {}
}
