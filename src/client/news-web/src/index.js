import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory }  from 'history';
import { ConnectedRouter , connectRouter, routerMiddleware } from 'connected-react-router';
import { unregister } from './serviceWorker';

import App from './App';
import * as reducers from './reducers/index';

import './index.scss';

const history = createBrowserHistory();

const appReducers = combineReducers({
  ...reducers,
  router: connectRouter(history),
});

// Chrome redux debugger middleware
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(history)),
);

const configureStore = (state) => {
  const store = createStore(
    appReducers,
    state,
    enhancer,
  );

  return store;
};

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
unregister();

export default store;
