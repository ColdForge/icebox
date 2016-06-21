import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import sortByReducer from './sortByReducer';
import sortOrderReducer from './sortOrderReducer';
import iceboxReducer from './iceboxReducer';
import iceboxSearchReducer from './iceboxSearchReducer';
import userReducer from './userReducer';
import recipesReducer from './recipesReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
	form,
	auth: authReducer,
	sortBy: sortByReducer,
	sortOrder: sortOrderReducer,
	icebox: iceboxReducer,
	iceboxSearch: iceboxSearchReducer,
	user: userReducer,
	recipes: recipesReducer,
	profile: profileReducer,
});

export default rootReducer;
