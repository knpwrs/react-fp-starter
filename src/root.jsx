import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import g from 'glamorous';
import Header from './components/header';
import Home from './containers/home';
import About from './containers/about';

export default () => (
  <Router>
    <g.Div
      display="flex"
      flexDirection="column"
      fontFamily="sans-serif"
      padding="0 1em"
    >
      <Header />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Redirect to="/home" />
      </Switch>
    </g.Div>
  </Router>
);
