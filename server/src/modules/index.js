import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import CustomerRoutes from './customers/routes';
import ProductRoutes from './products/routes';
import UserRoutes from './users/routes';
import AuthenticationRoutes from './authentication/routes';
import OrderRoutes from './orders/routes';

const AppQuery = new GraphQLObjectType({
  name: 'AppQuery',
  description: 'Application query schema',
  fields: () => ({
    ...AuthenticationRoutes.query,
    ...UserRoutes.query,
    ...CustomerRoutes.query,
    ...ProductRoutes.query,
    ...OrderRoutes.query,
  })
});

const AppMutation = new GraphQLObjectType({
  name: 'AppMutation',
  description: 'Application mutation schema',
  fields: () => ({
    ...AuthenticationRoutes.mutation,
    ...UserRoutes.mutation,
    ...CustomerRoutes.mutation,
    ...ProductRoutes.mutation,
    ...OrderRoutes.mutation
  })
})

const AppSchema = new GraphQLSchema({
  query: AppQuery,
  mutation: AppMutation
});

export default AppSchema;