import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import sortByReducer from './sortByReducer';
import sortOrderReducer from './sortOrderReducer';
import iceboxReducer from './iceboxReducer';
import iceboxSearchReducer from './iceboxSearchReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	form,
  auth: authReducer,
  sortBy: sortByReducer,
  sortOrder: sortOrderReducer,
  icebox: iceboxReducer,
  iceboxSearch: iceboxSearchReducer,
  user: userReducer,
});

export default rootReducer;
