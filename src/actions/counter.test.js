import test from 'ava';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
} from './counter';

test('increment', (t) => {
  t.deepEqual(increment(), {
    type: 'INCREMENT',
    payload: true,
  });
});

test('decrement', (t) => {
  t.deepEqual(decrement(), {
    type: 'DECREMENT',
    payload: true,
  });
});

test('incrementAsync', (t) => {
  t.deepEqual(incrementAsync(), {
    type: 'INCREMENT_ASYNC',
    payload: true,
  });
});

test('decrementAsync', (t) => {
  t.deepEqual(decrementAsync(), {
    type: 'DECREMENT_ASYNC',
    payload: true,
  });
});
