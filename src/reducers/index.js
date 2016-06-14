import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import sortByReducer from './sortByReducer';
import sortOrderReducer from './sortOrderReducer';

const rootReducer = combineReducers({
	form,
  auth: authReducer,
  sortBy: sortByReducer,
  sortOrder: sortOrderReducer,
});

export default rootReducer;
