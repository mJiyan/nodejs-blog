'use strict';

module.exports = (app) => {
    const userFunctions = require('../controllers/userController'),
        userRole = require('../../utils');

    app.route('/users')
        .get(userRole(1), userFunctions.list_all_users);

    app.route('/user/:id')
        .delete(userRole(1), userFunctions.delete_user);
}