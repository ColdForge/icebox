var helpers = require('../config/helpers');

module.exports = function (app) {

  app.route('api/icebox')
    .get(helpers.getAllItems)
    .post(helpers.postAllItems);

  app.route('api/icebox/:id')
    .get(helpers.getItem)
    .post(helpers.postItem)
    .delete(helpers.deleteItem);

}