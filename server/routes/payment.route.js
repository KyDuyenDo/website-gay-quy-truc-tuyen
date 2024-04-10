const express = require("express");
const router = express.Router();
const Payment = require("../models/payment.model");

router.get("/config", async (req, res) => {
  return res.status(200).json({
    status: "success",
    data: process.env.CLIENT_ID,
  });
});

router.post("/create", async (req, res) => {
  try {
    const {
      payerName,
      payerEmail,
      TradingCode,
      method,
      status,
      amount,
      tip,
    } = req.body;
    const newPayment = new Payment({
      payerName: payerName,
      payerEmail: payerEmail,
      TradingCode: TradingCode,
      method: method,
      status: status,
      amount: amount,
      tip: tip,
    });
    newPayment.save();
    return res.status(200).json(newPayment);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
