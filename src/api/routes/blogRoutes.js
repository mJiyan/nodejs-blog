'use strict';

module.exports = (app) => {
    const blogFunctions = require('../controllers/blogController'),
         userRole = require('../../utils');


    app.route('/blogs')
        .get(userRole(3), blogFunctions.list_all_blogs)
        .post(userRole(3), blogFunctions.create_blog);

    app.route('/blog/:id')
        .get(userRole(3),blogFunctions.get_blog)
        .put(userRole(3),blogFunctions.update_blog)
        .delete(userRole(3),blogFunctions.delete_blog);
}