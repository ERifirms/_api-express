const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  ratting: Number,
  review: String,
});

module.exports = mongoose.model("Review", ReviewSchema);
