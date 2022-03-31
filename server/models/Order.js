const { Schema, model } = require('mongoose');
const orderItemSchema = require('./OrderItem');

const orderSchema = new Schema(
  {
    orderDate: {
        type: Date,
        default: Date.now
    },
    items: [orderItemSchema],
    totalCost: {
        type: Number
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

const Order = model('Order', orderSchema);

module.exports = Order;
