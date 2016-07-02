import React from 'react';
import { GridList } from 'material-ui/GridList';
import IceboxListItem from './iceboxListItem';

const IceboxList = ({ windowWidth, contents, addToTrash, removeFromTrash }) => (
	<div className="icebox-list-container">
		<GridList
			className="icebox-list"
			cellHeight={400}
			cols={windowWidth < 1000 ? 2 : 3}
			padding={0}
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
	windowWidth: React.PropTypes.number,
	contents: React.PropTypes.array.isRequired,
	addToTrash: React.PropTypes.func,
	removeFromTrash: React.PropTypes.func,
};


export default IceboxList;
