import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import throttle from 'lodash.throttle';
import reducers from '../reducers';
import { loadState, saveState } from './localStorage';
import { AUTHORIZE_USER } from '../constants/actions';

import DUMMY_ICEBOX from '../data/dummyFoodList';
import DUMMY_PAST_SUGGESTIONS from '../data/dummyRecipeSuggestions';

const configureStore = (testMode,state) => {
	const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  let store;
  if(testMode){
    store = createStoreWithMiddleware(reducers,state);
  } else {
    const token = localStorage.getItem('token');
    const loadedState = loadState();
    let persistedState = {...loadedState, icebox: DUMMY_ICEBOX, recipes: { pastSuggestions: DUMMY_PAST_SUGGESTIONS } };
    store = createStoreWithMiddleware(reducers,persistedState, window.devToolsExtension ? window.devToolsExtension() : f => f);
    if(token) {
      store.dispatch({ type: AUTHORIZE_USER });
    }

    store.subscribe(throttle(() => {
      saveState({
        icebox: store.getState().icebox,
        // user: store.getState().user,
      });
    }, 1000));
  }
  return store;
};

export default configureStore;