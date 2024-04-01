const express = require("express");
const { isAuth } = require("../middleware/isAuth");
const {
  getAllMember,
} = require("../controllers/management.controller");
const router = express.Router();

// create donation
router.post("");
// get user's donation history
router.get("");
// get article's donation
router.get("/get/donors", getAllMember);
// get article's donation by user name
