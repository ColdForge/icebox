import { POPULATE_ICEBOX, ADD_ITEMS, REMOVE_ITEMS } from '../constants/actions';
import { v4 } from 'node-uuid';

export default function (state = [], action) {
	let newItems;
	switch (action.type) {
	case POPULATE_ICEBOX:
		newItems = action.payload.map(item => {
			switch (item.foodGroup.toLowerCase()) {
			case 'fruit':
				return ({ ...item, key: v4(), iconPath: '../../assets/fruit.png' });
			case 'vegetables':
				return ({ ...item, key: v4(), iconPath: '../../assets/vegetables.png' });
			case 'dairy':
				return ({ ...item, key: v4(), iconPath: '../../assets/dairy.png' });
			case 'meat':
				return ({ ...item, key: v4(), iconPath: '../../assets/meat.png' });
			case 'grains':
				return ({ ...item, key: v4(), iconPath: '../../assets/grains.png' });
			default:
				return ({ ...item, key: v4(), iconPath: '../../assets/snacks.png' });
			}
		});
		return [...state, ...newItems];
	case ADD_ITEMS:
		newItems = action.payload.map(item => ({ ...item, key: v4() }));
		return [...state, ...newItems];
	case REMOVE_ITEMS:
		return state;
	default:
		return state;
	}
}
