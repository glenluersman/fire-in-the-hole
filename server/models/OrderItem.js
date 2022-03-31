const { Schema, model } = require('mongoose');

const orderItemSchema = new Schema(
    {
        productID: {
            type: String,
            required: true
        },
        productName: {
            type: String,
            required: true
          },
        price: {
            type: Number,
            required: true
        },
        image: {
        type: String
        },
        quantity: {
            type: Number,
            default: 0
        }
    },
    {
      toJSON: {
        virtuals: true
      }
    }
  );

orderItemSchema.virtual('itemTotal').get(function() {
  return this.quantity * this.price;
});

module.exports = orderItemSchema;