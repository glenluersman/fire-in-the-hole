import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className='container' id='navbar'>
            <div className="row">
              <div className="col-6">
                <h3><Link to='/orderHistory'>Order History</Link></h3>
              </div>
              <div className="col-6">
              <h3><a href='/' onClick={() => Auth.logout()}>Logout</a></h3>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='container' id='navbar'>
        <h3><Link to='/login'>Login</Link> Not a member? <Link to='/signup'>Signup Here</Link></h3>      
        </div>
      );
    }
  }

  return (
    <header>
      <h1>
        <Link to='/'>Fire In The Hole</Link>
      </h1>
      <nav>{showNavigation()}</nav>
    </header>
  ); 
}

export default Nav;
