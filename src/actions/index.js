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
	dispatch => {
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
	dispatch => {
		axios.post(`${API_URL}/user/signup`, { email, name, password })
			.then(response => {
				// console.log('Response from signup', response);
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

export const signoutUser = () => (
	dispatch => {
		dispatch({ type: TYPES.DEAUTHORIZE_USER });
		dispatch({ type: TYPES.CLEAR_USER_INFO });
		dispatch({ type: TYPES.CLEAR_ICEBOX });
		dispatch({ type: TYPES.CLEAR_RECIPES });
		localStorage.clear();
		browserHistory.push('/');
	}
);

export const getUserProfile = () => (
	dispatch => {
		axios.get(`${API_URL}/api/profile`, {
			headers: { authorization: localStorage.getItem('token') },
		})
			.then(response => {
				// console.log('Successful', response);
				dispatch({ type: TYPES.GET_USER_PROFILE, payload: response.data });
			})
			.catch(response => (
				response
				// console.log('error in getUserProfile, response of : ', response);
			));
	}
);

export const addUserToIcebox = ({ email }) => (
	dispatch => {
		// console.log('Inside of addUser in actions', email);
		axios.post(`${API_URL}/api/profile/add`, { email }, {
			headers: { authorization: localStorage.getItem('token') },
		})
		.then(response => {
			// console.log('Successfully added user', response);
			dispatch({ type: TYPES.ADD_USER_ICEBOX, payload: response.data });
		})
		.catch(response => (
			response
		));
	}
);

export const removeUserFromIcebox = ({ user }) => (
	dispatch => {
		// console.log('Inside of removeUser in actions', user);
		axios.post(`${API_URL}/api/profile/remove`, { user }, {
			headers: { authorization: localStorage.getItem('token') },
		})
		.then(response => {
			// console.log('Successfully removed user', response);
			dispatch({ type: TYPES.REMOVE_USER_ICEBOX, payload: response.data });
		})
		.catch(response => (
			response
		));
	}
);

export const updateUserStaples = (staples) => (
	dispatch => {
		// console.log('Inside of updateUserStaples in actions', staples);
		axios.post(`${API_URL}/api/profile/staples`, staples, {
			headers: { authorization: localStorage.getItem('token') },
		})
		.then(response => {
			// console.log('Successfully added user', response);
			dispatch({ type: TYPES.UPDATE_USER_STAPLES, payload: response.data });
		})
		.catch(response => (
			response
		));
	}
);

export const acceptInvite = (details) => (
	dispatch => {
		// console.log('Inside of acceptInvitation in actions', details);
		axios.post(`${API_URL}/api/profile/accept`, details, {
			headers: { authorization: localStorage.getItem('token') },
		})
		.then(response => {
			// console.log('Successfully accepted invite', response);
			dispatch({ type: TYPES.UPDATE_USER_INFO, payload: response.data });
			dispatch({ type: TYPES.POPULATE_ICEBOX, payload: response.data.contents });
		})
		.catch(response => (
			response
		));
	}
);

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

export const addIceboxItems = ({ foodItems }) => (
	dispatch => {
		dispatch({ type: TYPES.START_LOADING });
		// console.log('foodItems in addIceboxItems is : ', foodItems);
		axios.post(`${API_URL}/api/icebox/add`, { foodItems }, {
			headers: { authorization: localStorage.getItem('token') },
		})
			.then(response => {
				// console.log('good response from addIceboxItems is : ', response);
				dispatch({ type: TYPES.ADD_ITEMS, payload: response.data.recognizedItems });
				dispatch({
					type: TYPES.CLARIFY_ITEMS,
					noExpirationItems: response.data.noExpirationItems,
					unrecognizedItems: response.data.unrecognizedItems,
				});
				dispatch({ type: TYPES.END_LOADING });
			})
			.catch(() => {
				// console.log('bad response from addIceboxItems is : ', response);
				dispatch({ type: TYPES.END_LOADING });
				// dispatch({ type: TYPES.ICEBOX_ERROR, payload: response.data });
			});
	}
);

export const resolveIceboxItems = ({ foodItems }) => (
	dispatch => {
		dispatch({ type: TYPES.START_LOADING });
		// console.log('foodItems in resolveIceboxItems is : ', foodItems);
		axios.post(`${API_URL}/api/icebox/resolve`, { foodItems }, {
			headers: { authorization: localStorage.getItem('token') },
		})
			.then(response => {
				// console.log('good response from resolveIceboxItems is : ', response);
				dispatch({ type: TYPES.END_LOADING });
				dispatch({ type: TYPES.ADD_ITEMS, payload: response.data.addedItems });
				dispatch({ type: TYPES.CLEAR_CLARIFYING_ITEMS });
			})
			.catch(() => {
				// console.log('bad response from resolveIceboxItems is : ', response);
				dispatch({ type: TYPES.END_LOADING });
				// dispatch({ type: TYPES.ICEBOX_ERROR, payload: response.data });
			});
	}
);

export const removeIceboxItems = ({ items }) => (
	dispatch => {
		dispatch({ type: TYPES.START_LOADING });
		// console.log('items passed in are : ', items);
		const itemIDs = {};
		items.forEach(item => {
			itemIDs[item.itemID] = true;
		});
		axios.post(`${API_URL}/api/icebox/remove`, { items }, {
			headers: { authorization: localStorage.getItem('token') },
		})
			.then(() => {
				dispatch({ type: TYPES.END_LOADING });
				dispatch({ type: TYPES.REMOVE_ITEMS, payload: itemIDs });
			})
			.catch(() => {
				dispatch({ type: TYPES.END_LOADING });
				// console.log('error in removeIceboxItems, response of : ', response);
			});
	}
);

export const addToTrash = ({ id }) => ({
	type: TYPES.ADD_TO_TRASH,
	payload: id,
});

export const removeFromTrash = ({ id }) => ({
	type: TYPES.REMOVE_FROM_TRASH,
	payload: id,
});

export const getRecipes = () => (
	dispatch => {
		dispatch({ type: TYPES.START_LOADING });
		axios.get(`${API_URL}/api/icebox/pastRecipes`, {
			headers: { authorization: localStorage.getItem('token') },
		})
			.then(response => {
				dispatch({ type: TYPES.END_LOADING });
				dispatch({ type: TYPES.GET_RECIPES, payload: response.data });
			})
			.catch(() => {
				dispatch({ type: TYPES.END_LOADING });
				// console.log('error in getRecipes, response of : ', response);
			});
	}
);

export const getRecipeSuggestions = () => (
	dispatch => {
		dispatch({ type: TYPES.START_LOADING });
		axios.get(`${API_URL}/api/icebox/recipes`, {
			headers: { authorization: localStorage.getItem('token') },
		})
			.then(response => {
				console.log('response from getRecipeSuggestions is : ', response);
				dispatch({ type: TYPES.END_LOADING });
				dispatch({ type: TYPES.GET_RECIPE_SUGGESTIONS, payload: response.data.suggestions });
			})
			.catch(() => {
				dispatch({ type: TYPES.END_LOADING });
				// console.log('error in getRecipeSuggestions, response of : ', response);
			});
	}
);

export const chooseRecipe = ({ recipe }) => (
	dispatch => {
		axios.post(`${API_URL}/api/icebox/recipes`, { recipe }, {
			headers: { authorization: localStorage.getItem('token') },
		})
			.then(response => {
				console.log('chooseRecipe fired with recipe of : ', recipe);
				dispatch({ type: TYPES.SET_CHOSEN_RECIPE, payload: response.data });
			});
			// .catch(response => (
			// 	response
			// 	// console.log('error in chooseRecipe, response of : ',response);
			// ));
	}
);

export const showRecipeDetails = (recipeId) => (
	dispatch => {
		// console.log('actions, showRecDetail params: ', recipeId);
		axios.get(`${API_URL}/api/icebox/recipe_details`, {
			headers: { authorization: localStorage.getItem('token'), getId: recipeId },
		})
			.then(response => {
				// console.log('Actions, showRecipeDetails resp', response);
				dispatch({ type: TYPES.GET_RECIPE_DETAIL, payload: response.data });
			});
			// .catch(response => (
			// 	response
			// ));
	}
);

export const clearRecipe = () => ({
	type: TYPES.CLEAR_CHOSEN_RECIPE,
});
