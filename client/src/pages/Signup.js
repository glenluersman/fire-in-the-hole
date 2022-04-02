import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup() {
  const [formState, setFormState] = useState({ email: '', password: '' });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const mutationResponse = await ADD_USER({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className='container'>
      <Link to='/login'>Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor='firstName'>First Name:</label>
          <input
            placeholder='First'
            name='firstName'
            type='firstName'
            id='firstName'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name:</label>
          <input
            placeholder='lastName'
            name='lastName'
            type='firstName'
            id='lastName'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            placeholder='email'
            name='email'
            type='email'
            id='email'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='pwd'>Password:</label>
          <input
            placeholder='*******'
            name='password'
            type='password'
            id='pwd'
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}

export default Signup;
