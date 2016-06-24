import { GET_USER_PROFILE, ADD_USER_ICEBOX, REMOVE_USER_ICEBOX } from '../constants/actions';

const INITIAL_STATE = {
	name: null,
	email: null,
	household: [],
	staples: [],
	confirmations: null,
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
	case GET_USER_PROFILE:
		return {
			...state,
			name: action.payload.profile.name,
			email: action.payload.profile.email,
			household: [...state.household, ...action.payload.household],
			staples: [...state.household, ...action.payload.staples],
		};
	case ADD_USER_ICEBOX:
		return {
			...state,
			confirmations: action.payload,
		};
	case REMOVE_USER_ICEBOX:
		return {
			...state,
			household: action.payload.household,
		};
	default:
		return state;
	}
}
