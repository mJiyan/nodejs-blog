'use strict'
const mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

let BlogSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    content: String,
    isPublished: Boolean,
});

BlogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Blog', BlogSchema);