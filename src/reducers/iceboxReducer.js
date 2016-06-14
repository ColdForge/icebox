import { POPULATE_ICEBOX, ADD_ITEMS, REMOVE_ITEMS } from '../constants/actions';
import { v4 } from 'node-uuid';

export default function(state = [], action) {
	let newItems;
	switch(action.type){
		case POPULATE_ICEBOX:
			newItems = action.payload.contents.map(item => ({...item, key: v4()}));
			return [...state, ...newItems];
		case ADD_ITEMS:
			newItems = action.payload.contents.map(item => ({...item, key: v4()}));
			return [...state, ...newItems];
		case REMOVE_ITEMS:
			
	}
	return state;
}