import React from 'react';
import { ListItem } from 'material-ui/List';

const styles = {
	ListItem: {
		text: {
			color: '#000000',
		},
	},
};

const RecipeListItem = ({ name }) => (
	<ListItem
		className="recipeListItem"
		style={styles.ListItem.text}
	>
		<div className="recipe-list-item-container">
			<div className="recipe-name">
			{name}
			</div>
		</div>
	</ListItem>
);

RecipeListItem.propTypes = {
	name: React.PropTypes.string.isRequired,
};

export default RecipeListItem;
