const express = require("express");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false }, null);
const requireAdminAuth = require("../middleware/adminAuth");
const requireFundraiserAuth = require("../middleware/fundraiserAuth");
const decodeToken = require("../middleware/decodeToken");
const {
  addArticle,
  confirmArticle,
  rejectArticle,
  getArticle,
  getArticles,
  deleteArticle,
  addComment,
  updateArticle,
  getCategories,
  addActivity,
  addCategory,
  upLoadImage,
} = require("../controllers/article.controller");

const {
  commentValidator,
  validatorHandler,
} = require("../middleware/article/userInputValidator");

const router = express.Router();

router.post("/create", addArticle);
router.put("/up_image", upLoadImage);
router.post("/confirm/:postId", requireAuth, requireAdminAuth, confirmArticle);
router.post("/reject/:postId", requireAuth, requireAdminAuth, rejectArticle);

router.get("/get/:id", getArticle);
router.get("/get", getArticles);

router.post(
  "/add/comment",
  requireAuth,
  decodeToken,
  commentValidator,
  validatorHandler,
  addComment
);
router.post("/add/activity", requireAuth, requireFundraiserAuth, addActivity);

router.delete("/del/:id", deleteArticle);

router.post("/add/category", addCategory);
router.get("/all/categories", getCategories);

module.exports = router;
