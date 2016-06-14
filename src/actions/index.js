// Actions will go here
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as TYPES from '../constants/actions';

const API_URL = 'http://localhost:8080';

export const signinUser = ({ email, password }) => {
	return function(dispatch) {
		axios.post(`${API_URL}/user/signin`, { email, password })
			.then(response => {
				console.log('response inside signinUser : ',response);
				dispatch({ type: TYPES.AUTHORIZE_USER });
				dispatch({ type: TYPES.GET_USER_INFO, payload: response.data });
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/icebox');
			})
			.catch(response => {
				dispatch(authError(response));
			});
	}
}

export const signupUser = ({ email, name, password }) => {
	return function(dispatch) {
		axios.post(`${API_URL}/user/signup`, { email, name, password })
			.then(response => {
				dispatch({ type: TYPES.AUTHORIZE_USER });
				dispatch({ type: TYPES.GET_USER_INFO, payload: response.data });
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/icebox');
			})
			.catch(response => {
				console.log('error in signup user, response of : ',response);
				dispatch(authError(response.data.error));
			});
	}
}

export const signoutUser = () => {
	localStorage.removeItem('token');
	browserHistory.push('/');
	return function(dispatch) {
		dispatch({ type: TYPES.DEAUTHORIZE_USER });
		dispatch({ type: TYPES.CLEAR_USER_INFO });
	}
}

export const authError = (error) => ({
	type: TYPES.AUTHORIZE_ERROR,
	payload: error
})

export const setSortBy = (sort) => ({
	type: TYPES.SET_SORT,
	sort
});

export const setSortOrder = (order) => ({
	type: TYPES.SET_SORT_ORDER,
	order
});