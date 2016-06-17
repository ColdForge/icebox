import React from 'react';
import { List } from 'material-ui/List';
import IceboxListItem from './iceboxListItem';
import FoodItemInput from './foodItemInput';

const IceboxList = ({ contents }) => (
	<div>
		<FoodItemInput contents={contents} />
		<List className="icebox-list">
			{contents.map(item => (
				<IceboxListItem
					key={item.key}
					item={item}
					name={item.name}
					foodGroup={item.foodGroup}
					expiration={item.expiration}
					iconPath={item.iconPath}
				/>
			))}
		</List>
	</div>
);

IceboxList.propTypes = {
	contents: React.PropTypes.array.isRequired,
};


export default IceboxList;
