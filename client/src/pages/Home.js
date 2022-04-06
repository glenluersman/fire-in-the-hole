import React, { useState } from 'react';
import CategoryMenu from '../components/CategoryMenu';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

const Home = () => {
  const [currentCategory, setCategory] = useState('');

  return (
    <div>
      <CategoryMenu setCategory={setCategory} id='categoryCategory'/>
      <ProductList currentCategory={currentCategory} />
      <Cart />
    </div>
  );
};

export default Home;
