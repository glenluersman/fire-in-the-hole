const { User, Product, Review } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('reviews');
        },

        userId: async (parent, { _id }) => {
            return User.findOne({ _id })
                .select('-__v -password')
                .populate('reviews');
        },

        userName: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('reviews');
        },

        products: async () => {
            return Product.find()
            .populate('reviews');
        },

        productId: async (parent, { _id }) => {
            return Product.findOne({ _id })
            .populate('reviews');
        },

        productName: async (parent, { productName }) => {
            return Product.findOne({ productName })
            .populate('reviews');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            // const token = signToken(user);
            return user;
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            
            return user;
        },

        addProduct: async (parent, args) => {
            const product = await Product.create(args);
            return product;
        },

        addReview: async (parent, args) => {
            const review = await Review.create({ rating: args.rating, reviewText: args.reviewText });

            await User.findByIdAndUpdate(
                { _id: args.userId },
                { $push: { reviews: review._id } },
                { new: true, runValidators: true }
            );

            await Product.findByIdAndUpdate(
                { _id: args.productID },
                { $push: { reviews: review._id } },
                { new: true, runValidators: true }
            );

            return review;
        }
    }
};

module.exports = resolvers;