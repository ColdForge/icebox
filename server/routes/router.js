var helpers = require('../config/helpers');

module.exports = function (app) {

  app.route('api/icebox/:id')
    .get(helpers.getItem)
    .delete(helpers.deleteItem);

    app.post('api/icebox/post', helpers.postItem);

    app.route('api/icebox')
      .get(helpers.getAllItems)
      .post(helpers.postAllItems);

}