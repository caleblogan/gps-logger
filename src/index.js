import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import geoApp from './reducers';

import '../semantic/dist/semantic.css';
import styles from './index.css';

import App from './components/App/App';


let root = document.createElement('root');
root.id = 'root';
document.body.appendChild(root);

// let store = createStore(geoApp);
const store = createStore(
  geoApp,
  applyMiddleware(thunk)
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