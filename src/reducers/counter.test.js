import test from 'ava';
import R from 'ramda';
import counterReducer from './counter';
import {
  increment,
  decrement,
} from '../actions/counter';

test('initial state', (t) => {
  const state = counterReducer(undefined, { type: '@@INIT' });
  t.is(state, 0);
});

test('handle increment', (t) => {
  const actions = [increment(), increment(), increment()];
  const state = R.reduce(counterReducer, 0, actions);
  t.is(state, 3);
});

test('handle decrement', (t) => {
  const actions = [decrement(), decrement(), decrement()];
  const state = R.reduce(counterReducer, 0, actions);
  t.is(state, -3);
});

test('handle increment/decrement', (t) => {
  const actions = [increment(), decrement(), increment()];
  const state = R.reduce(counterReducer, 0, actions);
  t.is(state, 1);
});
