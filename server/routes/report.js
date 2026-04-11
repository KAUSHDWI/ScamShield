const express = require("express");
const router = express.Router();

const { createReport, getReports } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createReport);
router.get("/", getReports);

module.exports = router;