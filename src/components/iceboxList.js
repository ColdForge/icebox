import React from 'react';
// import { List } from 'material-ui/List';
import { GridList } from 'material-ui/GridList';
import IceboxListItem from './iceboxListItem';

const IceboxList = ({ contents }) => (
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
					foodGroup={item.foodGroup}
					expiration={item.expiration}
				/>
			))}
		</GridList>
	</div>
);

IceboxList.propTypes = {
	contents: React.PropTypes.array.isRequired,
};


export default IceboxList;
