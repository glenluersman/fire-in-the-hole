import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import "./index.css";

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {showRate((rating) => {
        const ratingValue = i + 1;
        console.log(ratingValue);
        return (
          <label>
            <input
              type='radio'
              name='rating'
              value={ratingValue}
              onClick={() => setRating(ratingValue)}              
            />
            <FaStar
              className='star'
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={20}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
            
          </label>
          
        );
      })}
    </div>
  );
};

export default StarRating;