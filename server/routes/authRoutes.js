// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// Register
router.post(
  "/register",
  [
    check("email").isEmail(),
    check("password").isLength({ min: 4 }),
    check("confirmPassword").custom(
      (value, { req }) => value === req.body.password
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const existEmail = await User.findOne({ email });
      if (existEmail) {
        return res
          .status(400)
          .json({ status: "error", message: "Email is already exist." });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User registered" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ status: "success", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
