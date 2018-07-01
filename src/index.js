import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { getSnapshot, destroy, onSnapshot } from 'mobx-state-tree';
import { connectReduxDevtools } from 'mst-middlewares';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Stores } from './store/Stores';

const localStorageKey = 'burger-builder';

const initialState = localStorage.getItem(localStorageKey)
  ? JSON.parse(localStorage.getItem(localStorageKey))
  : {
      auth: {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
      },
      burgerBuilder: {
        ingredients: null,
        totalPrice: 4,
        error: false
      },
      order: {
        orders: [],
        loading: false,
        purchased: false
      }
    };

let store;
let snapshotListener;

function createStore(snapshot) {
  // clean up snapshot listener
  if (snapshotListener) snapshotListener();
  // kill old store to prevent accidental use and run clean up hooks
  if (store) destroy(store);

  // create new one
  store = Stores.create(snapshot);

  // connect devtools
  connectReduxDevtools(require('remotedev'), store);
  // connect local storage
  snapshotListener = onSnapshot(store, snapshot =>
    localStorage.setItem(localStorageKey, JSON.stringify(snapshot))
  );

  return store;
}

function renderApp(App, store) {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}

// Initial render
renderApp(App, createStore(initialState));

// Connect HMR
if (module.hot) {
  module.hot.accept(['./store/Stores'], () => {
    // Store definition changed, recreate a new one from old state
    renderApp(App, createStore(getSnapshot(store)));
  });

  module.hot.accept(['./App'], () => {
    // Componenent definition changed, re-render app
    renderApp(App, store);
  });
}

registerServiceWorker();
