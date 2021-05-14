const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(15).required(),
  name_surname: Joi.string().min(3).max(40).pattern(new RegExp('[A-Za-zÇçÖöŞşÜüĞğİı]')).required(),
  kind: String,
  age: Number,
  gender: String
})


module.exports = { registerSchema };
