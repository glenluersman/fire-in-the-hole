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

    type Category {
        _id: ID
        categoryName: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        users: [User]
        user(_id: String!): User
        products: [Product]
        product(_id: String!): Product
        order(userId: ID!, orderId: ID!): Order
        categories: [Category]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addProduct(productName: String!, price: Float!, description: String!, ingredients: [String], image: String, quantity: Int): Product
        addReview(rating: Int!, reviewText: String, userId: ID, productID: ID): Review
        addOrder(_id: ID!, products: [ID]!): Order
        updateProduct(_id: ID!, quantity: Int!): Product
        updateUser(username: String, email: String, password: String): User
    }

`;

module.exports = typeDefs;
