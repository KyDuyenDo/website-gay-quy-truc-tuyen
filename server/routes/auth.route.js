const router = require("express").Router();

const {
  verifyEmailValidation,
  verifyEmail,
} = require("../middleware/users/verifyEmail");

router.get("/verify", verifyEmailValidation, verifyEmail);

module.exports = router;