const express = require("express");
const { isAuth } = require("../middleware/isAuth");
const {
  getAllDonor,
  getDonorOfArticle,
} = require("../controllers/search.controller");
const router = express.Router();

// create donation
router.post("");
// get user's donation history
router.get("");
// get article's donation
router.get("");
// get article's donation by user name
router.get("", getDonorOfArticle);
