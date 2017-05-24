import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './containers/home';
import About from './containers/about';

export default () => (
  <Router>
    <div>
      <header>
        <h1>React FP Starter</h1>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </header>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Redirect to="/home" />
      </Switch>
    </div>
  </Router>
);
