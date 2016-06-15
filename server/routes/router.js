var helpers = require('../config/helpers');

module.exports = function (app) {

    app.post('api/icebox/post', helpers.postItem);

    app.route('api/icebox/recipes')
      .get(helpers.getRecipes)
      .post(helpers.postRecipe);

    app.route('api/icebox/:id')
      .get(helpers.getItem)
      .delete(helpers.deleteItem);

    app.route('api/icebox')
      .get(helpers.getAllItems)
      .post(helpers.postAllItems);

}