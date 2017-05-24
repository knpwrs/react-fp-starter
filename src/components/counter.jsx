import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';
import { pure } from 'recompose';

const CounterButton = g.button({
  border: '1px solid black',
  marginRight: '1em',
});

const Counter = ({ increment, decrement, counter }) => (
  <div>
    <h2>Counter: {counter}</h2>
    <CounterButton onClick={increment}>+1</CounterButton>
    <CounterButton onClick={decrement}>-1</CounterButton>
  </div>
);

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default pure(Counter);
