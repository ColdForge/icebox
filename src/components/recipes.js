import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';

//import RecipeToolbar from '../containers/recipeToolbar';
//import RecipeList from '../containers/RecipeList';

class Recipes extends Component {
 render(){
   return (
     <div className="recipes-container">
     <Tabs>
     	<Tab label="Recipe Suggestions">
     		<div>
	     		<h1>recipe suggestions go here</h1>
	     	</div>
	    </Tab>
	    <Tab label="Past Recipes">
     		<div>
	     		<h1>Past Recipes</h1>
	     	</div>
	    </Tab>
	   </Tabs>
     </div>
   );
 }
}

function mapStateToProps(state){
 return { recipes: state.recipes, user: state.user };
}

export default connect(mapStateToProps)(Recipes);
