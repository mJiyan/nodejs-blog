'use strict';
const passport = require('passport'),
    routesBlog = require('./blogRoutes'),
    routesUser = require('./userRoutes'),
    routesAuth = require('./authRoutes');


module.exports = app => {

    routesAuth(app);
    app.use(passport.authenticate('jwt', { jwtSession: false }));
    routesUser(app);
    routesBlog(app);

};