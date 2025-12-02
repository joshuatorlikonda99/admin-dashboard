const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// BYPASS DATABASE LOGIN → ALWAYS RETURN ADMIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Allow any email + password
    if (email && password) {
      const fakeUser = {
        id: "12345",
        name: "Admin User",
        email: email,
        role: "admin",
      };

      const token = jwt.sign(
        { id: fakeUser.id, role: fakeUser.role },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "7d" }
      );

      return res.json({
        token,
        user: fakeUser,
      });
    }

    return res.status(400).json({ message: "Email & password required" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Dummy register route (optional)
router.post("/register", (req, res) => {
  return res.json({ message: "Register disabled in mock mode" });
});

// Dummy /me route (optional)
router.get("/me", (req, res) => {
  return res.json({
    id: "12345",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  });
});

module.exports = router;
