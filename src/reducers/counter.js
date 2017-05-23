import R from 'ramda';
import { handleActions } from 'redux-actions';
import {
  increment,
  decrement,
} from '../actions/counter';

export default handleActions({
  [increment]: R.add(1),
  [decrement]: R.subtract(R.__, 1),
}, 0);
