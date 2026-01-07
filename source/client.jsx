import React from 'react';
import { createRoot } from 'react-dom/client';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import FRouter from './routes';

import './utils/normalize.less';
import './utils/global.less';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const container = document.querySelector('.feather-contents');

if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <FRouter />
    </Provider>
  );
}
