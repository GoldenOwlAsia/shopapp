import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import UserRoutes from './customers/routes';
import ProductRoutes from './products/routes';

const AppQuery = new GraphQLObjectType({
  name: 'AppQuery',
  description: 'Application query schema',
  fields: () => ({
    ...UserRoutes.query,
    ...ProductRoutes.query
  })
});

const AppMutation = new GraphQLObjectType({
  name: 'AppMutation',
  description: 'Application mutation schema',
  fields: () => ({
    ...UserRoutes.mutation,
    ...ProductRoutes.mutation
  })
})

const AppSchema = new GraphQLSchema({
  query: AppQuery,
  mutation: AppMutation
});

export default AppSchema;