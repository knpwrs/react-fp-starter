import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const Counter = ({ increment, decrement, counter }) => (
  <div>
    <h2>Counter: {counter}</h2>
    <button onClick={increment}>+1</button>
    <button onClick={decrement}>-1</button>
  </div>
);

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default pure(Counter);
