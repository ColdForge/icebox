import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import throttle from 'lodash.throttle';
import reducers from '../reducers';
import { loadState, saveState } from './localStorage';
import { AUTHORIZE_USER } from '../constants/actions';

import DUMMY_ICEBOX from '../data/dummyFoodList';

const token = localStorage.getItem('token');

const configureStore = () => {
	const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  const loadedState = loadState();
  let persistedState = {...loadedState, icebox: DUMMY_ICEBOX };
  const store = createStoreWithMiddleware(reducers,persistedState, window.devToolsExtension ? window.devToolsExtension() : f => f);
  if(token) {
    store.dispatch({ type: AUTHORIZE_USER });
  }

  store.subscribe(throttle(() => {
    saveState({
      icebox: store.getState().icebox,
      // user: store.getState().user,
    });
  }, 1000));

  return store;
};

export default configureStore;