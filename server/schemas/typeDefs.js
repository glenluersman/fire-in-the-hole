const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        reviews: [Review]
        orders: [Order]
    }
    
    type Product {
        _id: ID
        productName: String!
        price: Float!
        description: String!
        ingredients: [String]
        reviews: [Review]
        image: String
        quantity: Int
    }

    type Order {
      _id: ID
      purchaseDate: String
      products: [Product]
    }

    type Review {
        _id: ID
        rating: Int!
        reviewText: String
    }

    type Query {
        users: [User]
        user(_id: String!): User
        products: [Product]
        product(_id: String!): Product
        order(userId: ID!, orderId: ID!): Order
    }

    type Mutation {
        login(email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): User
        addProduct(productName: String!, price: Float!, description: String!, ingredients: [String], image: String, quantity: Int): Product
        addReview(rating: Int!, reviewText: String, userId: ID, productID: ID): Review
        addOrder(_id: ID!, products: [ID]!): Order
        updateProduct(_id: ID!, quantity: Int!): Product
    }

`;

module.exports = typeDefs;
