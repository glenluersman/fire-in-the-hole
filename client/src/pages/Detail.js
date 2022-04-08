import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
import { ADD_REVIEW } from '../utils/mutations'
import spinner from '../assets/spinner.gif';
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import Cart from '../components/Cart';
import { idbPromise } from "../utils/helpers";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [formState, setFormState] = useState('');

  const addReview = useMutation(ADD_REVIEW);

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;
  
  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    } 
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
  
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
  
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 }
      });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  }

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    });
  
    // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addReview({
        variables: { rating: formState.rating, reviewText: formState.reviewText, productId: currentProduct._id }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      {currentProduct ? (
        <div>
          {console.log(currentProduct)}
          <Link to='/'>Back to Products</Link>
          <h2>{currentProduct.name}</h2>
          <p>Rating</p>
          <p>{currentProduct.description}</p>
          <p>
            {currentProduct.ingredients.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
            ))}
          </p>
          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button 
              disabled={!cart.find(p => p._id === currentProduct._id)} 
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt='loading' /> : null}
      <Cart />
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='rating'>Rating</label>
        <input
          placeholder='rating of 1-5'
          name='rating'
          type='rating'
          id='rating'
          onChange={handleChange}
        />
        <label htmlFor='reviewText'>Review:</label>
        <textarea
          placeholder='type review here'
          name='reviewText'
          type='text'
          id='review'
          onChange={handleChange}
        />
        <button type="submit">Add Review</button>
      </form>
    </>
  );
}

export default Detail;