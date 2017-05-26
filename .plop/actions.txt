import R from 'ramda';
import { createAction } from 'redux-actions';

export const increment = createAction('INCREMENT', R.T);
export const decrement = createAction('DECREMENT', R.T);
