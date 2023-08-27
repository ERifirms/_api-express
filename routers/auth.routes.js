const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

router.post("/register", async (req, res) => {
  const { username, email, password, confPassword } = req.body;
  try {
    if (password != confPassword) {
      return res.status(401).json({
        msg: "password dan confrm Password tidak sama",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      msg: "register successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
