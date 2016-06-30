import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { GridList } from 'material-ui/GridList';
import * as actions from '../actions';
import SweetAlert from 'sweetalert-react';
// import Avatar from 'material-ui/Avatar';
// import Subheader from 'material-ui/Subheader';
import RecipeSuggestionListItem from '../components/recipeSuggestionListItem';

class RecipeSuggestionList extends Component {
  constructor(props){
    super(props);
    this.state = {
      chosenRecipe: null,
      suggestionsOpen: {},
      showAlert: false,
    }
    this.handleRecipeChoice = this.handleRecipeChoice.bind(this);
    this.determineChosenRecipeID = this.determineChosenRecipeID.bind(this);
  }

  componentWillMount() {
    if(this.props.suggestions.length === 0){
      this.props.getRecipeSuggestions();
      console.log("RSL: suggestion will mount fired")
    }
  }

  handleSuggestionToggle(id){

  }

  handleRecipeChoice(recipe) {
    // if user has not currently set a chosen recipe
    if(!this.props.chosenRecipe){
      console.log("Choose Recipe fired")
      this.setState({
      	chosenRecipe: recipe,
      	showAlert: true,
      })
      // this.props.chooseRecipe({ recipe });
    } else {
    	this.setState({ showWarning: true });
      // alert('You have already selected a recipe!');
    }
  }

  handleRecipeDetails(recipe) {
    if(!this.props.recipeDetail){
      console.log("Recipe Details - handleDetails fired with :", recipe);
      this.props.showRecipeDetails(recipe.id);
    }
  }

  determineChosenRecipeID(){
  	return this.props.chosenRecipe ? this.props.chosenRecipe.recipe.id : null
  }

  render() {
    // const chosenRecipeID = this.props.chosenRecipe ? this.props.chosenRecipe.id : null;
    const height = window.innerHeight - 144;
    console.log('height is : ',height)
    console.log('this.props.suggestions are : ',this.props.suggestions);
    return (
      <div className="recipe-suggestion-list-container">
      	<SweetAlert
      		show={this.state.showAlert}
      		title="Are you sure?"
      		type="info"
      		text="You can choose a recipe every 3 days, but cannot change your choice once made."
      		showCancelButton
      		onConfirm={() => {
      			console.log('confirm'); // eslint-disable-line no-console
      			this.props.chooseRecipe({ recipe: this.state.chosenRecipe });
      			this.setState({ showAlert: false, chosenRecipe: null });
      		}}
      		onCancel={() => {
      			console.log('cancel'); // eslint-disable-line no-console
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
      			console.log('confirm'); // eslint-disable-line no-console
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
              getRecipeDetails={this.handleRecipeDetails.bind(this, suggestion)}
              recipeLocation={this.props.recipeDetail}
            />
          ))}
        </GridList>
      </div>
    );
  }
}

RecipeSuggestionList.propTypes = {
  suggestions: React.PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  suggestions: state.recipes.suggestions,
  chosenRecipe: state.recipes.chosenRecipe,
  recipeDetail : state.recipes.recipeDetail,
});

export default connect(mapStateToProps, actions)(RecipeSuggestionList);

// <List className="recipe-suggestion-list">
//   {this.props.suggestions.map(suggestion => (
//     <RecipeSuggestionListItem
//       key={suggestion.key}
//       recipe={suggestion}
//       chooseRecipe={this.handleRecipeChoice.bind(this,suggestion)}
//       getRecipeDetails={this.handleRecipeDetails.bind(this, suggestion)}
//       recipeLocation={this.props.recipeDetail}
//     />
//   ))}
// </List>

//let SelectableList = MakeSelectable(List);

// function wrapState(ComposedComponent) {
//   return class SelectableList extends Component {
//     static propTypes = {
//       children: PropTypes.node.isRequired,
//       defaultValue: PropTypes.number.isRequired,
//     };

//     componentWillMount() {
//       this.setState({
//         selectedIndex: this.props.defaultValue,
//       });
//     }

//     handleRequestChange = (event, index) => {
//       this.setState({
//         selectedIndex: index,
//       });
//     };

//     render() {
//       return (
//         <ComposedComponent
//           value={this.state.selectedIndex}
//           onChange={this.handleRequestChange}
//         >
//           {this.props.children}
//         </ComposedComponent>
//       );
//     }
//   };
// }

// SelectableList = wrapState(SelectableList);

// const ListExampleSelectable = () => (
//   <SelectableList defaultValue={3}>
//     <ListItem
//       value={3}
//       primaryText="Kerem Suer"
//     />
//     <ListItem
//       value={4}
//       primaryText="Eric Hoffman"
//     />
//     <ListItem
//       value={5}
//       primaryText="Raquel Parrado"
//     />
//   </SelectableList>
// );

// export default ListExampleSelectable;
