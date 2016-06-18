var helpers = require('../config/helpers');
var express = require('express'),
  router = express.Router();

// Route when user gets past recipe choices
router.get('/icebox/pastRecipes', helpers.getPreviousRecipes)
// Route when user gets recipe suggestions
router.get('/icebox/recipes', helpers.getRecipes)
// Route when user selects a recipe suggestion
router.post('/icebox/recipes', helpers.postRecipe)
router.get('/icebox/recipe_details', helpers.getRecipeDetails)
router.get('/icebox/:id', helpers.getItem)
router.delete('/icebox/:id', helpers.deleteItem)
router.get('/icebox', helpers.getAllItems)
router.post('/icebox', helpers.postAllItems)

module.exports = router;

// module.exports = function (app) {

//     app.route('api/icebox/recipes')
//       .get(helpers.getRecipes)
//       .post(helpers.postRecipe);

//     app.get('api/icebox/recipe_details', helpers.getRecipeDetails);

//     app.get('api/icebox/previous_recipes', helpers.getPreviousRecipes);

//     app.route('api/icebox/:id')
//       .get(helpers.getItem)
//       .delete(helpers.deleteItem);

//     app.route('api/icebox')
//       .get(helpers.getAllItems)
//       .post(helpers.postAllItems);

// }
