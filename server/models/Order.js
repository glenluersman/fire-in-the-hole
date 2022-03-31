const { Schema, model } = require('mongoose');
const orderItemSchema = require('./OrderItem');

const orderSchema = new Schema(
  {
    orderDate: {
        type: Date,
        default: Date.now
    },
    items: [orderItemSchema]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

orderSchema.virtual('totalCost').get(function() {
  return this.items.itemTotal
})

const Order = model('Order', orderSchema);

module.exports = Order;
