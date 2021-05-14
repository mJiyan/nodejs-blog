const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  helmet = require('helmet'),
  morgan = require('morgan'),
  passport = require('passport'),
  { api, logger, options } = require('../config'),
  routeManager = require('../api/routes/routeManager'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  swaggerUI = require("swagger-ui-express"),
  swaggerJsDoc = require("swagger-jsdoc"),
  { User, Admin, Blog } = require('../models/');
  


module.exports = ({ app }) => {

    //To serve static files such as images, CSS files, and JavaScript files
    app.use(express.static('public'));

    //Used to enable CORS with various options.
    app.use(cors({ origin: ['http://localhost:3000'] }));
    app.get('/', (req, res) => res.json('Welcome to node-api. http://localhost:8081/api-docs'));

    //Extracts the entire body portion of an incoming request stream and exposes it on req. body
    app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    app.use(bodyParser.json({ limit: '5mb' }));

    //Simplifies the process of logging requests
    app.use(morgan('dev'));

    //Helps secure HTTP headers returned by your Express apps.
    app.use(helmet());

    // Passport Strategies
    app.use(passport.initialize());

    // Passport Strategy
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // JWT Strategy
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: api.jwtSecretKey
    };

    passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
        User.findOne({ _id : jwt_payload.id}, function(err, user) {
            if (err) return done(err, false);
            if (user) return done(null, user);
            else return done(null, false);
        });
    }));


    // app.use(api.prefix, routes);

    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    routeManager(app);


    /// error handler
    app.use((err, req, res, next) => {
      res.status(err.status || 500)
      const errors = {
        status: err.status,
        message: err.message,
        documentation_url: err.documentation_url
      }
      res.json({ errors })
      logger.error(JSON.stringify({ errors }))
    });

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found')
        err['status'] = 404
        err['documentation_url'] = 'http://localhost:8081/api-docs'
        next(err)
    });



}
