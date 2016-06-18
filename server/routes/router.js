var helpers = require('../config/helpers');

module.exports = function (app) {

    app.route('api/icebox/recipes')
      .get(helpers.getRecipes)
      .post(helpers.postRecipe);

    app.get('api/icebox/recipe_details', helpers.getRecipeDetails);

    app.get('api/icebox/previous_recipes', helpers.getPreviousRecipes);

    app.route('api/icebox/:id')
      .get(helpers.getItem)
      .delete(helpers.deleteItem);

    app.route('api/icebox')
      .get(helpers.getAllItems)
      .post(helpers.postAllItems);

}
