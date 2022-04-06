import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul>
          <li>
            <Link to='/orderHistory'>Order History</Link>
          </li>
          <li>
            <a href='/' onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul id='verify'>
          <li>
          <Link to='/login'>Login</Link>
          </li>
          <li><p>Not a member? Click <Link to='/signup'>Here</Link> to join.</p></li> 
        </ul>
      );
    }
  }

  return (
    <header id ='mainJumbo'>
      <h1>
        <Link to='/'>Fire In The Hole</Link>
      </h1>
      <h4 id='jumboSubtext'>The one stop shop for all your hot sauce needs.</h4>
      <nav>{showNavigation()}</nav>
    </header>
  ); 
}

export default Nav;
