import React from 'react';
import { ListItem } from 'material-ui/List';

const styles = {
	ListItem: {
		text: {
			color: '#000000',
		},
	},
};

const IceboxListItem = ({ name, foodGroup, iconPath, expiration }) => {
	if (!name) {
		return <ListItem primaryText="Loading..." />;
	}

	let textColor = 'expiration-black';

	if (expiration <= 3) {
		textColor = 'expiration-red';
	}
	if (expiration > 3 && expiration <= 6) {
		textColor = 'expiration-orange';
	}
	if (expiration > 7) {
		textColor = 'expiration-black';
	}

	return (
		<ListItem
			className="iceboxListItem"
			style={styles.ListItem.text}
		>
			<div className="list-item-container" data-food-group={foodGroup}>
				<img className="food-group-icon" alt="Food Group" src={iconPath} />
				<div className="item-name">
				{name}
				</div>
				<div className={textColor} id="expiration">
				{expiration}
				</div>
			</div>
		</ListItem>
	);
};

IceboxListItem.propTypes = {
	name: React.PropTypes.string.isRequired,
	foodGroup: React.PropTypes.string.isRequired,
	iconPath: React.PropTypes.string.isRequired,
	expiration: React.PropTypes.number.isRequired,
};

export default IceboxListItem;
