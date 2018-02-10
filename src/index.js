import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import geoApp from './reducers';

import '../semantic/dist/semantic.css';
import styles from './index.css';

import App from './components/App/App';
import ApiClient from './api/apiClient'
import {apiMiddleware} from './lib/middleware'


let root = document.createElement('root');
root.id = 'root';
document.body.appendChild(root);




const store = createStore(
  geoApp,
  applyMiddleware(
    // logger,
    apiMiddleware(new ApiClient()),
    thunk
  )
);


const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    root
  )
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    render(App)
  });
}