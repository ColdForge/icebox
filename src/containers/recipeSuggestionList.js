import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { GridList } from 'material-ui/GridList';
import * as actions from '../actions';
import SweetAlert from 'sweetalert-react';
import RecipeSuggestionListItem from '../components/recipeSuggestionListItem';

class RecipeSuggestionList extends Component {
  constructor(props){
    super(props);
    this.state = {
      chosenRecipe: null,
      showAlert: false,
      showWarning: false,
    }
    this.handleRecipeChoice = this.handleRecipeChoice.bind(this);
    this.determineChosenRecipeID = this.determineChosenRecipeID.bind(this);
  }

  componentWillMount() {
    if(this.props.suggestions.length === 0){
      this.props.getRecipeSuggestions();
    }
  }

  handleRecipeChoice(recipe) {
    // if user has not currently set a chosen recipe
    if(!this.props.chosenRecipe){
      this.setState({
      	chosenRecipe: recipe,
      	showAlert: true,
      })
    } else {
    	this.setState({ showWarning: true });
    }
  }

  determineChosenRecipeID(){
  	return this.props.chosenRecipe ? this.props.chosenRecipe.recipe.id : null
  }

  render() {
    const height = window.innerHeight - 120;
    return (
      <div className="recipe-suggestion-list-container">
      	<SweetAlert
      		show={this.state.showAlert}
      		title="Are you sure?"
      		type="info"
      		text="You can choose a recipe every 3 days, but cannot change your choice once made."
      		showCancelButton
      		onConfirm={() => {
      			this.props.chooseRecipe({ recipe: this.state.chosenRecipe });
      			this.setState({ showAlert: false, chosenRecipe: null });
      		}}
      		onCancel={() => {
      			this.setState({ showAlert: false, chosenRecipe: null });
      		}}
      		onEscapeKey={() => this.setState({ showAlert: false, chosenRecipe: null })}
      		onOutsideClick={() => this.setState({ showAlert: false, chosenRecipe: null })}
      	/>
      	<SweetAlert
      		show={this.state.showWarning}
      		title="You have already chosen a recipe!"
      		type="warning"
      		text="You can choose a new recipe every 3 days"
      		onConfirm={() => {
      			this.setState({ showWarning: false });
      		}}
      		onEscapeKey={() => this.setState({ showWarning: false })}
      		onOutsideClick={() => this.setState({ showWarning: false })}
      	/>
        <GridList
          className="recipe-suggestion-list"
          cellHeight={height}
          cols={3}
          padding={5}
        >
          {this.props.suggestions.map(suggestion => (
            <RecipeSuggestionListItem
              key={suggestion.key}
              chosenRecipeID={this.determineChosenRecipeID()}
              recipe={suggestion}
              chooseRecipe={this.handleRecipeChoice.bind(this,suggestion)}
            />
          ))}
        </GridList>
      </div>
    );
  }
}

RecipeSuggestionList.propTypes = {
	chosenRecipe: React.PropTypes.object,
  recipeDetail: React.PropTypes.object,
  suggestions: React.PropTypes.array.isRequired,
 	user: React.PropTypes.object,
};

const mapStateToProps = state => ({
  chosenRecipe: state.recipes.chosenRecipe,
  recipeDetail : state.recipes.recipeDetail,
  suggestions: state.recipes.suggestions,
  user: state.user,
});

export default connect(mapStateToProps, actions)(RecipeSuggestionList);
