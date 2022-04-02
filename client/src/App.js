import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import OrderHistory from './pages/OrderHistory';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/orderHistory' component={OrderHistory} />
        <Route exact path='/products/:id' component={Detail} />
      </div>
    </Router>
  );
}

export default App;
