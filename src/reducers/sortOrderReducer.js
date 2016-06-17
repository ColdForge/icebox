import { SET_SORT_ORDER } from '../constants/actions';

export default function (state = 'ASCENDING', action) {
	switch (action.type) {
	case SET_SORT_ORDER:
		return action.order;
	default:
		return state;
	}
}
