const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1/_api-express")
  .then((result) => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello word" });
});

// models
app.use("/", require("./routers/auth.routes"));
app.use("/products", require("./routers/product.routes"));
app.use("/", require("./routers/review.routes"));

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
