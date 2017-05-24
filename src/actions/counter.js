import R from 'ramda';
import { createAction } from 'redux-actions';

export const increment = createAction('INCREMENT', R.T);
export const decrement = createAction('DECREMENT', R.T);
export const incrementAsync = createAction('INCREMENT_ASYNC', R.T);
export const decrementAsync = createAction('DECREMENT_ASYNC', R.T);
