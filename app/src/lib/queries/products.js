import gql from 'graphql-tag';

export const GetAllProducts = gql`
  query {
    products {
      id,
      name,
      category,
      price,
      images,
      status,
      description,
      quantity,
      createdAt,
    }
  }
`;

export const GetAllCategories = gql`
  query {
    getCategories 
  }
`;

export const CreateProduct = gql`
  mutation createProduct(
    $name: String!, 
    $category: String!, 
    $importPrice: Float, 
    $price: Float, 
    $description: String,
    $color: String
    $images: [String]
    $quantity: Int
    $size: String
  ){
    createProduct(
      name: $name, 
      category: $category, 
      importPrice: $importPrice, 
      price: $price, 
      description: $description,
      color: $color
      images: $images
      quantity: $quantity
      size: $size
    ) {
      id
      name
      category
      status
      importPrice
      price
      description
      color
      images
      quantity
      size
    }
  }
`;