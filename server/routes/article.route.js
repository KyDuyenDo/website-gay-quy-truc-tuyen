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
  isLimitArticleUp,
  getUserArticleDetail,
  articleRaiseAmount,
  getArticleByLocation,
  getArticleByQuest,
} = require("../controllers/article.controller");

const {
  commentValidator,
  validatorHandler,
} = require("../middleware/article/userInputValidator");

const router = express.Router();

router.post("/create", requireAuth, requireFundraiserAuth, addArticle);
router.put("/up_image", requireAuth, upLoadImage);

router.get("/get/:id", getArticle);
router.get("/get", getArticles);
router.post("/get/by/location", getArticleByLocation);
router.get("/get/high/rating", getArticleHighRating);
router.put("/raise/amount", articleRaiseAmount);
router.get("/get/by/quest/:id", getArticleByQuest);
router.get(
  "/check/limt/post",
  requireAuth,
  requireFundraiserAuth,
  isLimitArticleUp
);
router.get("/user/get", requireAuth, requireFundraiserAuth, getArticleByUser);
router.post("/donors/get", getDonorOfArticle);
router.get(
  "/user/only/article/:id",
  requireAuth,
  requireFundraiserAuth,
  getUserArticleDetail
);
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
