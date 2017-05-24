import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';
import { pure } from 'recompose';

const CounterButton = g.button({
  border: '1px solid black',
  marginRight: '1em',
});

const Counter = ({ increment, incrementAsync, decrement, decrementAsync, counter }) => (
  <div>
    <h2>Counter: {counter}</h2>
    <CounterButton onClick={increment}>+1</CounterButton>
    <CounterButton onClick={incrementAsync}>+1 Aysnc</CounterButton>
    <CounterButton onClick={decrement}>-1</CounterButton>
    <CounterButton onClick={decrementAsync}>-1 Async</CounterButton>
  </div>
);

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  decrementAsync: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default pure(Counter);
