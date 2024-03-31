const express = require("express");
const router = express.Router();

// get donation's payment history

// get all payments
// create payment
// delete payment



router.get("/config", async (req, res) => {
  return res.status(200).json({
    status: "success",
    data: process.env.CLIENT_ID,
  });
});



module.exports = router;
