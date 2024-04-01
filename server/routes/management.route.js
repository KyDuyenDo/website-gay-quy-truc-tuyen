const express = require("express");
const router = express.Router();

const {
  getUserDonation,
  getChartData, // history
  getNotify,
  delNotify,
} = require("../controllers/management.controller");

router.get("/chart", getChartData);

module.exports = router;
