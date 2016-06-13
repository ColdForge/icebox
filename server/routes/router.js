var helpers = require('../config/helpers');

module.exports = function (app) {

  app.get('api/user/signup', helpers.createUser);

  app.post('api/user/signin', helpers.signIn);

  app.post('api/user/signout', helpers.signOut);

  app.route('api/icebox')
    .get(helpers.getAllItems)
    .post(helpers.postAllItems);

  app.route('api/icebox/:id')
    .get(helpers.getItem)
    .post(helpers.postItem)
    .delete(helpers.deleteItem);

}