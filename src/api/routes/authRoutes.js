'use strict';

module.exports = (app) => {
    const authFunctions = require('../controllers/authController'),
             passport = require('passport');
    app.route('/register')
        .post(authFunctions.register);
    
    app.route('/signin')
        .post(passport.authenticate('local'), authFunctions.signin);

    app.route('/signout')
        .post(authFunctions.signout);
}