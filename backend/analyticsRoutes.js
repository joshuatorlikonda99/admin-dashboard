const express = require("express");
const router = express.Router();

// STATIC ANALYTICS DATA (Mock Mode)
router.get("/overview", (req, res) => {
  res.json({
    totalUsers: 42,
    activeUsers: 17,
    totalMetrics: 12
  });
});

// STATIC CHART DATA
router.get("/chart", (req, res) => {
  res.json({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [5, 9, 7, 10, 12, 4, 8]
  });
});

module.exports = router;
