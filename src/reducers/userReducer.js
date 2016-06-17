import { GET_USER_INFO, UPDATE_USER_INFO, CLEAR_USER_INFO } from '../constants/actions';

export default function (state = {}, action) {
	switch (action.type) {
	case GET_USER_INFO:
		return {
			...state,
			id: action.payload.id,
			name: action.payload.name,
			email: action.payload.email,
			iceboxID: action.payload.iceboxID,
		};
	case UPDATE_USER_INFO:
		return {
			...state,
			id: action.payload.id,
			name: action.payload.name,
			email: action.payload.email,
			iceboxID: action.payload.iceboxID,
		};
	case CLEAR_USER_INFO:
		return {
			id: '',
			name: '',
			email: '',
			iceboxID: '',
		};
	default:
		return state;
	}
}
