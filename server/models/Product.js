const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [],
    reviews: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Review'
      },
    ],
    image: {
      type: String
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

productSchema.virtual('reviewCount').get(function() {
  return this.reviews.length;
});

const Product = model('Product', productSchema);

module.exports = Product;
