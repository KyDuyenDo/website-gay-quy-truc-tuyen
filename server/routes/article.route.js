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
  getArticleByUser,
  deleteArticle,
  addComment,
  updateArticle,
  getCategories,
  addActivity,
  addCategory,
  upLoadImage,
  getDonorOfArticle,
  getArticleHighRating,
} = require("../controllers/article.controller");

const {
  commentValidator,
  validatorHandler,
} = require("../middleware/article/userInputValidator");

const router = express.Router();

router.post("/create", requireAuth, requireFundraiserAuth, addArticle);
router.put("/up_image", requireAuth, upLoadImage);
router.post("/confirm/:postId", requireAuth, requireAdminAuth, confirmArticle);
router.post("/reject/:postId", requireAuth, requireAdminAuth, rejectArticle);

router.get("/get/:id", getArticle);
router.get("/get", getArticles);
router.get("/get/high/rating", getArticleHighRating);
router.get("/user/get", getArticleByUser);
router.post("/donors/get", getDonorOfArticle);
router.post(
  "/add/comment",
  requireAuth,
  decodeToken,
  commentValidator,
  validatorHandler,
  addComment
);
router.post("/add/activity", requireAuth, requireFundraiserAuth, addActivity);
router.delete("/del/:id", requireAuth, requireAdminAuth, deleteArticle);
router.post("/add/category", requireAuth, requireAdminAuth, addCategory);
router.get("/all/categories", getCategories);

module.exports = router;

