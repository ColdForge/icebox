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

const RecipeList = ({ recipes }) => (
	<div style={styles.root}>
		<GridList
			className="icebox-list"
			cellHeight={400}
			style={styles.gridlist}
			cols={3}
		>
			{recipes.map(recipe => (
				<RecipeListItem
					key={recipe.key}
					name={recipe.name}
					imageUrl={recipe.image}
					sourceUrl={recipe.sourceUrl}
					recipeID={recipe.recipeID}
					prepTime={recipe.readyInMinutes}
				/>
			))}
		</GridList>
	</div>
);

RecipeList.propTypes = {
	recipes: React.PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	recipes: state.recipes.pastSuggestions,
});

export default connect(mapStateToProps)(RecipeList);
