import {
  GraphQLString,
} from 'graphql';

import Controller from './controller';

export default {
  query: {
    reportByWeek: {
      type: GraphQLString,
      description: 'Report revenue by current week',
      resolve: Controller.reportByWeek
    },
    reportByMonth: {
      type: GraphQLString,
      description: 'Report revenue by current month',
      resolve: Controller.reportByMonth
    },
    reportByDay: {
      type: GraphQLString,
      description: 'Report revenue by today',
      resolve: Controller.reportByDay
    }
  },
  mutation: {}
}
