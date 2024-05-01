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
    const { payerName, payerEmail, TradingCode, method, status, amount, tip } =
      req.body;
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

// check payment TradingRef
router.get("/check/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({
        message: false,
      });
    }
    return res.status(200).json({ message: true });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// detele payment by _id
router.delete("/delete/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }
    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// get payment by _id
router.get("/get/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }
    return res.status(200).json({ data: payment, message: "found" });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// update payment status by _id
router.put("/update/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
      TradingCode: req.body.TradingCode,
    });
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }
    return res.status(200).json(payment);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
