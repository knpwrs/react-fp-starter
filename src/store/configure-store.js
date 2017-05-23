import { createStore } from 'redux';
import window from 'global/window';
import reducer from '../reducers';

export default () => createStore(
  reducer,
  /* eslint-disable */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  /* eslint-enable */
);
