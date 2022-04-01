const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
  {
    
    rating: {
        type: Number,
        required: true
    },
    reviewText: {
        type: String
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

const Review = model('Review', reviewSchema);

module.exports = Review;
