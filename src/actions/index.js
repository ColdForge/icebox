// Actions will go here
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as TYPES from '../constants/actions';

const API_URL = 'http://localhost:8080';

export const authError = (error) => ({
	type: TYPES.AUTHORIZE_ERROR,
	payload: error,
});

export const signinUser = ({ email, password }) => (
	(dispatch) => {
		axios.post(`${API_URL}/user/signin`, { email, password })
			.then(response => {
				// console.log('response inside signinUser : ', response);
				dispatch({ type: TYPES.AUTHORIZE_USER });
				dispatch({ type: TYPES.GET_USER_INFO, payload: response.data });
				dispatch({ type: TYPES.POPULATE_ICEBOX, payload: response.data.contents });
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/icebox');
			})
			.catch(response => {
				dispatch(authError(response));
			});
	}
);

export const signupUser = ({ email, name, password }) => (
	(dispatch) => {
		axios.post(`${API_URL}/user/signup`, { email, name, password })
			.then(response => {
				dispatch({ type: TYPES.AUTHORIZE_USER });
				dispatch({ type: TYPES.GET_USER_INFO, payload: response.data });
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/icebox');
			})
			.catch(response => {
				// console.log('error in signup user, response of : ',response);
				dispatch(authError(response.data.error));
			});
	}
);

export const signoutUser = () => {
	localStorage.removeItem('token');
	browserHistory.push('/');
	return dispatch => {
		dispatch({ type: TYPES.DEAUTHORIZE_USER });
		dispatch({ type: TYPES.CLEAR_USER_INFO });
	};
};

export const setSortBy = (sort) => ({
	type: TYPES.SET_SORT,
	sort,
});

export const setSortOrder = (order) => ({
	type: TYPES.SET_SORT_ORDER,
	order,
});

export const setIceboxSearch = (searchTerm) => ({
	type: TYPES.SET_ICEBOX_SEARCH,
	searchTerm,
});

export const clearIceboxSearch = () => ({
	type: TYPES.CLEAR_ICEBOX_SEARCH,
});

export const getRecipes = ({ user }) => (
	(dispatch) => {
		axios.get(`${API_URL}/api/user/recipes`, { user })
			.then(response => {
				dispatch({ type: TYPES.GET_RECIPES, payload: response.data });
			})
			.catch(response => (
				response
				// console.log('error in chooseRecipe, response of : ',response);
			));
	}
);

export const getRecipeSuggestions = ({ user }) => (
	(dispatch) => {
		axios.get(`${API_URL}/api/icebox/recipes`, { user })
			.then(response => {
				dispatch({ type: TYPES.GET_RECIPE_SUGGESTIONS, payload: response.data });
			})
			.catch(response => (
				response
				// console.log('error in chooseRecipe, response of : ',response);
			));
	}
);

export const chooseRecipe = ({ user, recipe }) => (
	(dispatch) => {
		axios.post(`${API_URL}/api/icebox/recipes`, { user, recipe })
			.then(response => {
				dispatch({ type: TYPES.SET_CHOSEN_RECIPE, payload: response.data });
			})
			.catch(response => (
				response
				// console.log('error in chooseRecipe, response of : ',response);
			));
	}
);

export const clearRecipe = () => ({
	type: TYPES.CLEAR_CHOSEN_RECIPE,
});
