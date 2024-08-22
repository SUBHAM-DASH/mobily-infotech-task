const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");

// Middleware to check token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res
      .status(401)
      .json({ status: "error", message: "Token not provided." });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ status: "error", message: "Unauthorized access." });
    }
    req.user = user;
    next();
  });
};

// Create Task
router.post("/tasks", authenticateToken, async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    const task = new Task({
      title,
      description,
      dueDate,
      userId: req.user.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Tasks
router.get("/tasks", authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
