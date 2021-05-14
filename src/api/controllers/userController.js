'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');



exports.list_all_users = (req, res) => {
    User.find((err, user) => {
        if (err) res.send(err);
        res.json(user.map(b => {
            const json = b.toObject();
            return { ...json, id: json._id };
        }));
    });
}

exports.delete_user = (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete({ _id: id }, (err, user) => {
        if (err) return res.status(500).send(err);
        else if (!user) return res.status(404).send(err);
        res.status(200).json({ id });
    });
}