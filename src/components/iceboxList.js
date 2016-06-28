import React from 'react';
// import { List } from 'material-ui/List';
import { GridList } from 'material-ui/GridList';
import IceboxListItem from './iceboxListItem';

const IceboxList = ({ contents, addToTrash, removeFromTrash }) => (
	<div>
		<GridList
			className="icebox-list"
			cellHeight={400}
			cols={3}
			padding={10}
		>
			{contents.map(item => (
				<IceboxListItem
					key={item.key}
					item={item}
					name={item.name}
					itemID={item.itemID}
					foodGroup={item.foodGroup}
					expiration={item.expiration}
					addToTrash={addToTrash}
					removeFromTrash={removeFromTrash}
				/>
			))}
		</GridList>
	</div>
);

IceboxList.propTypes = {
	contents: React.PropTypes.array.isRequired,
	addToTrash: React.PropTypes.func,
	removeFromTrash: React.PropTypes.func,
};


export default IceboxList;
