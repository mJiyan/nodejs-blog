'use strict';

const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    User = mongoose.model('User'),
    ValidateSchema = require('../validators/user.validator');


exports.register = (req, res) => {
    const { password, ...user } = req.body;
    const newUser = new User(user);
    const schema = ValidateSchema.registerSchema;
    const validation = schema.validate(req.body);

    if (validation.error) return res.status(422).send(validation.error.details);

    User.register(newUser, password, (err, user) => {
        if (err) return res.status(500).send(err);
        res.json({ id: user._id });
    });

}



exports.signin = (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (err) return res.status(400).send(err);
        else if (!user) return res.status(404).send(err);
        const { kind, id } = user;
        const token = jwt.sign({ kind, id }, process.env.PRIVATE_KEY);
        res.json({
            success: true,
            message: 'Authentication successful',
            kind,
            id,
            token
        });
    });
}

exports.signout = (req, res) => {
    const { id } = req.body;

    User.findOneAndUpdate({ _id: id }, { fcm_token: null }, (err, user) => {
        if (err) return res.status(400).send(err);
        else if (!user) return res.status(404).send(err);
        res.json({ message: 'Sign out successful' });
    });
};