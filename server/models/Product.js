const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true
    },
    manufacturer: {
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
