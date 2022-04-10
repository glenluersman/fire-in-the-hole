import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function StarRater() {
  const [rating, setRating] = useState(0) // initial rating value

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)
  }

  return (
    <div className='App'>
      <Rating
        onClick={handleRating}
        ratingValue={rating}
        fillColor={"#FC4A03"}
        fullIcon={<FaPepperHot size={30} />}
        emptyIcon={<FaPepperHot size={30} />}
    />
    </div>
  )
}