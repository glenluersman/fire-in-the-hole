const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        reviews: [Review]
    }
    
    type Product {
        _id: ID
        productName: String!
        manufacturer: String!
        price: Float!
        description: String!
        ingredients: [String]
        reviews: [Review]
        Image: String
    }

    type Review {
        _id: ID
        rating: Int!
        reviewText: String
    }

    type Query {
        users: [User]
        userId(_id: String!): User
        userName(username: String!): User
        products: [Product]
        productId(_id: String!): Product
        productName(productName: String!): Product
    }

    type Mutation {
        login(email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): User
        addProduct(productName: String!, manufacturer: String!, price: Float!, description: String!, ingredients: [String], image: String): Product
        addReview(rating: Int!, reviewText: String, userId: ID, productID: ID): Review
    }

`;

module.exports = typeDefs;