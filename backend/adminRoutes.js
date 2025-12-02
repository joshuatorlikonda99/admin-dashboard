const express = require("express");
const router = express.Router();

// STATIC IN-MEMORY USERS
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "user", isActive: true },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "user", isActive: true },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "editor", isActive: false }
];

// GET ALL USERS
router.get("/users", (req, res) => {
  res.json(users);
});

// UPDATE USER STATUS (mock update)
router.put("/users/:id/status", (req, res) => {
  const userId = parseInt(req.params.id);
  const { isActive } = req.body;

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isActive = isActive;

  return res.json({
    message: "User status updated",
    user
  });
});

module.exports = router;
