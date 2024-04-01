const router = require("express").Router();
const passport = require("passport");

const {
  addUser,
  signin,
  logout,
  protected,
  refreshToken,
  getUser,
  updateInfo,
  getAllMember,
  getMemberDetail,
  becomeFundraiser,
  upLoadImageFundraiser,
} = require("../controllers/user.controller");

const { sendVerificationEmail } = require("../middleware/users/verifyEmail");

const decodeToken = require("../middleware/decodeToken");

const requireAuth = passport.authenticate("jwt", { session: false }, null);

router.get("/:id", getUser);

router.post("/signup", addUser, sendVerificationEmail);
router.post("/refresh-token", refreshToken);
router.post("/signin", signin);

router.post("/logout", logout);
router.post("/protected", requireAuth, decodeToken, protected);
router.put("/:id", requireAuth, decodeToken, updateInfo);

router.post("/become/fundraiser", becomeFundraiser);
router.put("/up/image/fund", upLoadImageFundraiser);
router.get("/fundraiser", getAllMember);
router.get("/fundraiser/:id", getMemberDetail);

module.exports = router;
