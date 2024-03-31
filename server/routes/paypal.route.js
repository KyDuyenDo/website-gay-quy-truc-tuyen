const express = require("express");
const router = express.Router();
const { createOrder, captureOrder } = require("../services/paypal.api");

router.post("/create-paypal-order", async (req, res) => {
  try {
    const order = await createOrder();
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/capture-paypal-order", async (res, req) => {
  const { orderID } = req.body;
  try {
    const captureData = await captureOrder(orderID);
    return res.status(200).json(captureData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
