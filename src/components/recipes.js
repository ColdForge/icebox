import React, {Component} from 'react';
import { connect } from 'react-redux';

//import RecipeToolbar from '../containers/recipeToolbar';
//import RecipeList from '../containers/RecipeList';

class Recipes extends Component {
 render(){
   return (
     <div className="recipes-container">
     		<h1>recipe lists go here</h1>
     </div>
   );
 }
}

function mapStateToProps(state){
 return { recipes: state.recipes, user: state.user };
}

export default connect(mapStateToProps)(Recipes);
