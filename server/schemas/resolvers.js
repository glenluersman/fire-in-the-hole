const { User, Product, Review, Order } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('reviews');
        },

        user: async (parent, { _id }) => {
            const user = await User.findById(_id)
                .populate('reviews');

            user.orders.sort((a,b) => b.purchaseDate - a.purchaseDate);

            return user;
        },

        products: async () => {
            return Product.find()
            .populate('reviews');
        },

        product: async (parent, { _id }) => {
            return Product.findById({ _id })
            .populate('reviews');
        },

        order: async (parent, { userId, orderId }) => {
            const user = await User.findById(userId);
    
            return user.orders.id(orderId);
        }
    },

    Mutation: {
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

        
        addUser: async (parent, args) => {
            const user = await User.create(args);
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
        },

        addOrder: async (parent, { _id, products }) => {
            const order = new Order({ products });
    
            await User.findByIdAndUpdate(_id, { $push: { orders: order } });
    
            return order;
        },
        
        updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;
    
            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        }
    }
};

module.exports = resolvers;