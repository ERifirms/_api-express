const express = require("express");
const Product = require("../models/product.model");
const { validateProduct } = require("../middlewares/validateSchema");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ data: products });
});

router.post("/", validateProduct, async (req, res) => {
  try {
    const product = new Product(req.body.product);
    await product.save();

    res.status(202).json({
      msg: "Product add product successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews");
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", validateProduct, async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndUpdate(id, { ...req.body });
    res.status(200).json({
      msg: "Updated SuccessFully",
    });
  } catch (error) {
    res.json({
      msg: "failed update",
    });
    console.log(error);
  }
});

router.delete("/:id", validateProduct, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      msg: "deleted successssfully",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
