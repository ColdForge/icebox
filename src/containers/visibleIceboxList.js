import { connect } from 'react-redux';
import IceboxList from '../components/iceboxList';
import { SORT_EXPIRATION, SORT_FOODGROUP, SORT_FOODNAME, ASCENDING, DESCENDING } from '../constants/sorts';
import _sortBy from 'lodash/sortBy';

const orderIceboxItems = (items, sortBy, sortOrder) => {
	let sorted;
	switch (sortBy) {
		case SORT_EXPIRATION:
			if(sortOrder === ASCENDING){
				sorted = _sortBy(items, (item) => item.expiration);
				return sorted;
			} else {
				sorted = _sortBy(items, (item) => item.expiration);
				
				return sorted.reverse();
			}
		case SORT_FOODGROUP:
			if(sortOrder === ASCENDING){
				sorted = _sortBy(items, (item) => item.foodGroup);
				return sorted;
			} else {
				sorted = _sortBy(items, (item) => item.foodGroup);
				return sorted.reverse();
			}
		case SORT_FOODNAME:
			if(sortOrder === ASCENDING){
				sorted = _sortBy(items, (item) => item.name);
				return sorted;
			} else {
				sorted = _sortBy(items, (item) => item.name);
				return sorted.reverse();
			}

	}
}


function mapStateToProps(state) {
	return { contents: orderIceboxItems(state.icebox, state.sortBy, state.sortOrder) };
}

const VisibleIceboxList = connect(mapStateToProps)(IceboxList);

export default VisibleIceboxList;