import { put, call, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  incrementAsync,
  increment,
  decrementAsync,
  decrement,
} from '../actions/counter';

export function* incrementAsyncSaga() {
  yield call(delay, 1000);
  yield put(increment());
}

export function* decrementAsyncSaga() {
  yield call(delay, 1000);
  yield put(decrement());
}

export default function* rootSaga() {
  yield takeEvery(incrementAsync, incrementAsyncSaga);
  yield takeEvery(decrementAsync, decrementAsyncSaga);
}
