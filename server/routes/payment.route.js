const express = require("express");
const router = express.Router();

router.get("/config", async (req, res) => {
  return res.status(200).json({
    status: "success",
    data: process.env.CLIENT_ID,
  });
});

router.post("/create", async (req, res) => {
  try {
    const {
      donationId,
      payerName,
      payerEmail,
      TradingCode,
      method,
      status,
      amount,
      tip,
    } = req.body;

  } catch (error) {
    
  }
});

module.exports = router;
