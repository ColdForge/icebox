import React from 'react';
import { GridTile } from 'material-ui/GridList';

const RecipeListItem = ({ name, imageUrl, sourceUrl, recipeID, prepTime }) => (
	<a href={sourceUrl} target="_blank">
		<GridTile
			title={name}
			subtitle={`Prep Time: ${prepTime}min, Recipe ID: ${recipeID}`}
		>
			<img src={imageUrl} alt="Recipe" />
		</GridTile>
	</a>
);

RecipeListItem.propTypes = {
	name: React.PropTypes.string.isRequired,
	imageUrl: React.PropTypes.string.isRequired,
	sourceUrl: React.PropTypes.string.isRequired,
	recipeID: React.PropTypes.number.isRequired,
	prepTime: React.PropTypes.number.isRequired,
};

export default RecipeListItem;
