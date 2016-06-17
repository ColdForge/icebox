import React from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import RecipeListItem from '../components/recipeListItem';

const IceboxList = ({ recipes }) => (
	<div>
		<List className="icebox-list">
			{recipes.map(recipe => (
				<RecipeListItem
					key={recipe.key}
					name={recipe.name}
				/>
			))}
		</List>
	</div>
);

IceboxList.propTypes = {
	recipes: React.PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	recipes: state.recipes.pastSuggestions,
});

export default connect(mapStateToProps)(IceboxList);
