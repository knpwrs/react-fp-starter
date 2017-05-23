import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import document from 'global/document';
import Root from './root';
import configureStore from './store/configure-store';

const store = configureStore();

const el = document.createElement('div');
document.body.appendChild(el);

const mount = Component => render((
  <AppContainer>
    <Provider store={store}>
      <Component />
    </Provider>
  </AppContainer>
), el);

mount(Root);

if (module.hot) {
  module.hot.accept('./root.jsx', async () => {
    mount((await import('./root.jsx')).default);
  });
  module.hot.accept('./reducers', async () => {
    store.replaceReducer((await import('./reducers')).default);
  });
}
