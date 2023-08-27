const { productSchema } = require("../schemas/product.scema");
const { reviewSchema } = require("../schemas/review.schema");
const ExpressError = require("../utils/ErrorHandler");

module.exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return res.json(new ExpressError(msg, 400));
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return res.json(new ExpressError(msg, 400));
  }
  next();
};
