import { SET_SORT } from '../constants/actions';

export default function (state = 'SORT_EXPIRATION', action) {
	switch (action.type) {
	case SET_SORT:
		return action.sort;
	default:
		return state;
	}
}
