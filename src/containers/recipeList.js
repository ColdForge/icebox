import React from 'react';
import { connect } from 'react-redux';
import { GridList } from 'material-ui/GridList';
import RecipeListItem from '../components/recipeListItem';

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	gridList: {
		width: 500,
		height: 500,
		overflowY: 'auto',
		marginBottom: 24,
	},
};

const RecipeList = ({ recipes }) => {
	const height = window.innerHeight - 144;
	return (
		<div style={styles.root} className="recipe-list-container">
			<GridList
				className="recipe-list"
				cellHeight={height/2}
				style={styles.gridlist}
				cols={3}
			>
				{recipes.map(recipe => (
					<RecipeListItem
						key={recipe.recipeID}
						title={recipe.title}
						imageUrl={recipe.pic_url}
						// sourceUrl={recipe.sourceUrl}
						recipeID={recipe.recipeID}
						// prepTime={recipe.readyInMinutes}
					/>
				))}
			</GridList>
		</div>
	);
}

RecipeList.propTypes = {
	recipes: React.PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	recipes: state.recipes.pastSuggestions,
});

export default connect(mapStateToProps)(RecipeList);
