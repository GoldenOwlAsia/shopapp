import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';

import Controller from './controller';

const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "This represent an product",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    category: {
      type: GraphQLString
    },
    price: {
      type: GraphQLInt
    },
    image: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    }
  })
});

export default {
  query: {
    products: {
      type: new GraphQLList(ProductType),
      description: 'Get all products',
      resolve: Controller.getProducts
    },
  },
  mutation: {}
}
