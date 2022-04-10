import React from 'react';
import { Rating } from 'react-simple-star-rating';
 
export default function Stars(args) {

    const reviews = args;

    var ttl = 0;

    for (let i = 0; i < reviews.reviews.length; i++) {
        ttl = ttl + reviews.reviews[i].rating;
    }

    const rating = ttl / reviews.reviews.length;
  
    return (
      <div className='App'>
        <Rating ratingValue={rating} readonly={true} />
      </div>
    )
};
