'use strict';
module.exports = function(app) {
  var registration = require('../controllers/registrationController');

  app.route('/register')
    .get(registration.test)
    .post(registration.register);
};