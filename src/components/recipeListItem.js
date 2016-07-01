import React from 'react';
import { GridTile } from 'material-ui/GridList';

const RecipeListItem = ({ title, imageUrl, recipeID }) => (
	<GridTile
		title={title}
		className="recipe-tile"
		subtitle={`Prep Time: min, Recipe ID: ${recipeID}`}
		containerElement={<a href="www.google.com" target="_blank"></a>}
	>
		<img src={imageUrl} alt="Recipe" />
	</GridTile>
);

RecipeListItem.propTypes = {
	title: React.PropTypes.string.isRequired,
	imageUrl: React.PropTypes.string.isRequired,
	// sourceUrl: React.PropTypes.string.isRequired,
	recipeID: React.PropTypes.number.isRequired,
	// prepTime: React.PropTypes.number.isRequired,
};

export default RecipeListItem;
