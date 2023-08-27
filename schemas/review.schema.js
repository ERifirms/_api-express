const Joi = require("joi");

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    ratting: Joi.number().min(1).max(5).required(),
    review: Joi.string().required(),
  }).required(),
});
