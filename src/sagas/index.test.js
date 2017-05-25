import test from 'ava';
import { fork } from 'redux-saga/effects';
import rootSaga from './';
import counterSaga from './counter';

test('root saga', (t) => {
  const gen = rootSaga();
  t.deepEqual(gen.next().value, fork(counterSaga));
  t.true(gen.next().done);
});
