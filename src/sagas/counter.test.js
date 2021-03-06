import test from 'ava';
import { put, call, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import counterSaga, {
  incrementAsyncSaga,
  decrementAsyncSaga,
} from './counter';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
} from '../actions/counter';

test('incrementAsyncSaga', (t) => {
  const gen = incrementAsyncSaga(incrementAsync());
  t.deepEqual(gen.next().value, call(delay, 1000));
  t.deepEqual(gen.next().value, put(increment()));
  t.true(gen.next().done);
});

test('incrementAsyncSaga', (t) => {
  const gen = decrementAsyncSaga(decrementAsync());
  t.deepEqual(gen.next().value, call(delay, 1000));
  t.deepEqual(gen.next().value, put(decrement()));
  t.true(gen.next().done);
});

test('counterSaga', (t) => {
  const gen = counterSaga();
  t.deepEqual(gen.next().value, takeEvery(incrementAsync, incrementAsyncSaga));
  t.deepEqual(gen.next().value, takeEvery(decrementAsync, decrementAsyncSaga));
  t.true(gen.next().done);
});
