import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, pure } from 'recompose';

const Counter = ({ increment, decrement, counter }) => (
  <div>
    <h1>Counter: {counter}</h1>
    <button onClick={increment}>+1</button>
    <button onClick={decrement}>-1</button>
  </div>
);

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default compose(
  pure,
  withHandlers({
    increment: props => () => props.increment(),
    decrement: props => () => props.decrement(),
  }),
)(Counter);
