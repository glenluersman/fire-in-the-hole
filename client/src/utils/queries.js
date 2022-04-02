import { gql } from 'graphql-tag';

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          productName
          price
          description
          ingredients
          image
          quantity
        }
      }
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($products: ID) {
    products(products: $products) {
      _id
      productName
      price
      description
      ingredients
      image
      quantity
      reviews {
        _id
        rating
        reviewText
      }
    }
  }
`;
