const express = require("express");
const Product = require("../models/product.model");
const Review = require("../models/review.model");
const { validateReview } = require("../middlewares/validateSchema");

const router = express.Router();

router.post("/products/:id/reviews", validateReview, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    const review = new Review(req.body.review);
    product.reviews.push(review);

    await product.save();
    await review.save();

    res.json({
      msg: "review added seuccessfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/products/:product_id/reviews/:review_id", async (req, res) => {
  const { product_id, review_id } = req.params;
  try {
    await Product.findByIdAndUpdate(product_id, {
      $pull: { reviews: review_id },
    });
    await Review.findByIdAndDelete(review_id);

    res.status(200).json({ msg: "Deleted review successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred" }); // Atau kode status yang sesuai
  }
});

module.exports = router;
