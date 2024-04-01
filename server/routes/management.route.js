const express = require("express");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false }, null);
const requireAdminAuth = require("../middleware/adminAuth");
const requireFundraiserAuth = require("../middleware/fundraiserAuth");
const decodeToken = require("../middleware/decodeToken");
const router = express.Router();

const {
  getUserDonation,
  getChartData, // history
  getNotify,
  delNotify,
} = require("../controllers/management.controller");

router.get("/user/donation", requireAuth, decodeToken, getUserDonation);
router.get("/notify", requireAuth, decodeToken, getNotify);
router.post("/del/notify", requireAuth, decodeToken, delNotify);
router.get("/chart", requireAuth, decodeToken, getChartData);

module.exports = router;
