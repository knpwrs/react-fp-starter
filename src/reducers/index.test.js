import test from 'ava';
import rootReducer from './';

test('initial state', (t) => {
  const state = rootReducer(undefined, { type: '@@INIT' });
  t.deepEqual(state, {
    counter: 0,
  });
});
