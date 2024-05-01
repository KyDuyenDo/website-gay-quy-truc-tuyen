const express = require("express");
const router = express.Router();
const Donation = require("../models/donation.model");

const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false }, null);
const decodeToken = require("../middleware/decodeToken");

router.post("/create/private", requireAuth, decodeToken, async (req, res) => {
  try {
    const { articleId, paymentId, fullnameDonor, donationAmount, anonymous } =
      req.body;
    const userId = req.userId;

    // Check if paymentId already exists
    const existingDonation = await Donation.findOne({ paymentId: paymentId });

    if (existingDonation) {
      return res.status(400).json({
        message: "Donation with this paymentId already exists",
      });
    }

    const newDonation = new Donation({
      articleId: articleId,
      paymentId: paymentId,
      donorId: userId,
      fullnameDonor: fullnameDonor,
      donationAmount: donationAmount,
      anonymous: anonymous,
    });

    await newDonation.save();

    return res.status(200).json(newDonation);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.post("/create/public", async (req, res) => {
  try {
    const { articleId, paymentId, fullnameDonor, donationAmount, anonymous } =
      req.body;

    const existingDonation = await Donation.findOne({ paymentId: paymentId });

    if (existingDonation) {
      return res.status(400).json({
        message: "Donation with this paymentId already exists",
      });
    }
    
    const newDonation = new Donation({
      articleId: articleId,
      paymentId: paymentId,
      fullnameDonor: fullnameDonor,
      donationAmount: donationAmount,
      anonymous: anonymous,
    });
    newDonation.save();
    return res.status(200).json(newDonation);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
