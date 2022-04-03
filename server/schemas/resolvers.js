const { User, Product, Review, Order, Category } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find()
                .select('-__v -password')
                .populate('reviews');
        },

        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(_id)
                    .populate('reviews')
                    .populate({
                        path: 'orders.products',
                        populate: 'category'
                    });
    
                user.orders.sort((a,b) => b.purchaseDate - a.purchaseDate);
    
                return user;
            }

            throw new AuthenticationError('Not logged in');
        },

        products: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }

            return await Product.find(params)
            .populate('category')
            .populate('reviews');
        },

        product: async (parent, { _id }) => {
            return await Product.findById({ _id })
            .populate('category')
            .populate('reviews');
        },

        order: async (parent, { orderId }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id)
                .populate({
                    path: 'orders.products',
                    populate: 'category'
                });
        
                return user.orders.id(orderId);
            }

            throw new AuthenticationError('Not logged in');
        },

        categories: async () => {
            return await Category.find();
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

            const token = signToken(user);
            
            return { token, user };
        },

        
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
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

        addOrder: async (parent, { products }, context) => {
            if (context.user) {
                const order = new Order({ products });
        
                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
        
                return order;
            }

            throw new AuthenticationError('Not logged in');
        },
        
        updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;
    
            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        }
    }
};

module.exports = resolvers;