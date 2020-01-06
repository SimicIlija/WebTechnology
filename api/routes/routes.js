'use strict';
module.exports = function(app) {
  var registration = require('../controllers/registrationController');
  var login = require('../controllers/loginController');

  app.route('/register')
    .get(registration.test)
    .post(registration.register);

  app.route('/login')
    .post(login.login);
};