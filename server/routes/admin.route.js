const express = require("express");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false }, null);
const requireAdminAuth = require("../middleware/adminAuth");
const router = express.Router();
const {
  signin,
  confirmArticle,
  deleteArticle,
  removePublishedArticle,
  sendNotify,
  blockUser,
  OpenBlock,
  acceptFundraiser,
  rejectFundraiser,
  totalData,
  disbursement,
  disbursementByArticle,
  getDetailFundraiserAdmin,
  returnRequestMember,
  returnRequestArticle,
  getArticlesByAdmin,
  getAllUsers,
  getArticleByAdmin,
  puslishArticle,
  createDisbursement,
  getDetailUser,
  getAllFund
} = require("../controllers/admin.controller");

router.post("/signin", signin);
router.get("/disbursement", disbursement);
router.get("/disbursement/:id", disbursementByArticle);
router.post("/getDetailFundraiser", getDetailFundraiserAdmin);
router.get("/returnRequestMember", returnRequestMember);
router.get("/returnRequestArticle", returnRequestArticle);
router.get("/get/all/fund", getAllFund);
router.get("/getArticlesByAdmin", getArticlesByAdmin);
router.get("/all/users", getAllUsers);
router.get("/get/article/:id", getArticleByAdmin);
router.get("/user/detail/:id", getDetailUser);
router.use(requireAdminAuth);
router.post("/create/disbursement", createDisbursement);
router.post("/comfirm/article", confirmArticle);
router.post("/detele/article", deleteArticle);
router.post("/remove/pulished/article", removePublishedArticle);
router.post("/puslish", puslishArticle);
router.get("/verify", async (req, res) => {
  try {
    return res.json({ success: true, message: "you are admin." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/send/notify", sendNotify);
router.post("/block/user", blockUser);
router.post("/open/block", OpenBlock);
router.get("/total", totalData);

router.post("/accept/fundraiser", acceptFundraiser);
router.post("/reject/fundraiser", rejectFundraiser);

module.exports = router;
