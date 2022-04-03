import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        productName
        price
        description
        quantity
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $productName: String!
    $price: Float!
    $description: String!
    $ingredients: [String]
    $image: String
    $quantity: Int
  ) {
    addProduct(
      productName: $productName
      price: $price
      description: $description
      ingredients: $ingredients
      image: $image
      quantity: $quantity
    ) {
      productName
      price
      description
      ingredients
      image
      quantity
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview(
    $rating: Int!
    $reviewText: String
    $userId: ID
    $productID: ID
  ) {
    addReview(
      rating: $rating
      reviewText: $reviewText
      userId: $userId
      productID: $productID
    ) {
      token
      user {
        _id
      }
    }
  }
`;
