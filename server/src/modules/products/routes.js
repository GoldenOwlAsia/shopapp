import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt
} from 'graphql';

import Controller from './controller';

export const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "This represent an product",
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    category: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    importPrice: {
      type: GraphQLFloat
    },
    price: {
      type: GraphQLFloat
    },
    description: {
      type: GraphQLString
    },
    color: {
      type: GraphQLString
    },
    images: {
      type: new GraphQLList(GraphQLString)
    },
    quantity: {
      type: GraphQLInt
    },
    size: {
      type: GraphQLString
    },
  })
});

export const ProductInputType = new GraphQLInputObjectType({
  name: "ProductInput",
  description: "This represent an input of a product",
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    category: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    importPrice: {
      type: GraphQLFloat
    },
    price: {
      type: GraphQLFloat
    },
    description: {
      type: GraphQLString
    },
    color: {
      type: GraphQLString
    },
    images: {
      type: new GraphQLList(GraphQLString)
    },
    quantity: {
      type: GraphQLInt
    },
    size: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
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
    getProductById: {
      type: ProductType,
      description: 'Get a product',
      args: {
        productId: { type: GraphQLInt }
      },
      resolve: Controller.getProductById
    },
    getCategories: {
      type: new GraphQLList(GraphQLString),
      description: 'Get list of product categories',
      resolve: Controller.getCategories
    }
  },
  mutation: {
    createProduct: {
      type: ProductType,
      description: 'Create new product in database',
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        importPrice: {
          type: GraphQLFloat
        },
        price: {
          type: GraphQLFloat
        },
        description: {
          type: GraphQLString
        },
        color: {
          type: GraphQLString
        },
        images: {
          type: new GraphQLList(GraphQLString)
        },
        quantity: {
          type: GraphQLInt
        },
        size: {
          type: GraphQLString
        },
      },
      resolve: Controller.createProduct
    },
    updateProduct: {
      type: ProductType,
      description: 'Update a product in database',
      args: {
        productId: { type: GraphQLInt },
        params: { type: ProductInputType }
      },
      resolve: Controller.updateProduct
    }
  }
}
