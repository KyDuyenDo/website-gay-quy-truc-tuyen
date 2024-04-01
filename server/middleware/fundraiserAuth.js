const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Fundraiser = require("../models/fundraiser.model");

const requireFundraiserAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    

    const user = await User.findById(decoded.id);
    const fundraiser = await Fundraiser.findOne({ userId: user._id });

    if (fundraiser && fundraiser.adminApproval === true) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = requireFundraiserAuth;
