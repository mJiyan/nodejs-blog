'use strict';

var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog');



exports.list_all_blogs = (req, res) => {
    Blog.find((err, blog) => {
        if (err) res.send(err);
        res.json(blog.map(b => {
            const json = b.toObject();
            return { ...json, id: json._id };
        }));
    });
}

exports.get_blog = (req, res) => {
    const { id } = req.params;
    Blog.findOne({ _id: id }, (err, blog) => {
        if (err) return res.status(500).send(err);
        const json = blog.toObject();
        res.json({ ...json, id: json._id })
    });
}


exports.update_blog = (req, res) => {
    const { id } = req.params;
    Blog.findOneAndUpdate({ _id: id }, req.body, {new: true}, (err, blog) => {
        if (err) res.status(500).send(err);
        blog.save();
        const json = blog.toObject();
        res.json({ ...json, id: json._id });
    });
}

exports.create_blog = (req, res) => {
    const new_blog = new Blog(req.body);
    new_blog.save((err, blog) => {
        if (err) return res.status(500).send(err);
        const json = blog.toObject();
        res.json({ ...json, id: json._id });
    });
};


exports.delete_blog = (req, res) => {
    const { id } = req.params;
    Blog.findByIdAndDelete({ _id: id }, (err, blog) => {
        if (err) return res.status(500).send(err);
        else if (!blog) return res.status(404).send(err);
        res.status(200).json({ id });
    });
}