const express = require("express");
const Comment = require("../models/evaluation.model");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false }, null);
const decodeToken = require("../middleware/decodeToken");
const router = express.Router();

// create evaluation by user
router.get("/create", requireAuth, decodeToken, async (req, res) => {
  const { rating, evaluatee, userId } = req.body;
  try {
    const commentLater = await Comment.find({
      evaluatee: evaluatee,
      reviewerId: userId,
    });
    if (commentLater) {
      res.status(409).json({ message: "Cannot comment" });
    }
    const newComment = await new Comment({
      rating: rating,
      evaluatee: evaluatee,
      userId: userId,
    });
    await newComment.save();
    res.status(200).json({ message: "successfully" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
});

