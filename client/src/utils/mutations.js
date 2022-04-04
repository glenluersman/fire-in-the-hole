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
        name
        price
        description
        quantity
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
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
    $name: String!
    $price: Float!
    $description: String!
    $ingredients: [String]
    $image: String
    $quantity: Int
  ) {
    addProduct(
      name: $name
      price: $price
      description: $description
      ingredients: $ingredients
      image: $image
      quantity: $quantity
    ) {
      name
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
