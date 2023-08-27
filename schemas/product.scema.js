const Joi = require("joi");

module.exports.productSchema = Joi.object({
  product: Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().min(1).required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});
