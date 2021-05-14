'use strict';
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongoosePaginate = require('mongoose-paginate'),
  passportLocalMongoose = require('passport-local-mongoose');


const options = { discriminatorKey: 'kind' };

let UserSchema = new Schema({
  email: { type: String, index: { unique: true } },
  password: String,
  name_surname: { type: String, required: true },
  age: Number,
  gender: String,
}, options);

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
}, options);
UserSchema.plugin(mongoosePaginate);

let User = mongoose.model('User', UserSchema);

const Admin = User.discriminator('Admin',
  new Schema({
    admin: String
  }), options);

const Blogger = User.discriminator('Blogger',
  new Schema({
    blogger: String
  }), options);


module.exports = { Admin, Blogger, User };