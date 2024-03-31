const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // _id
  username: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, default: "donor" },
  state: { type: String, default: "active" },
  joindate: { type: Date, default: Date.now },
  avatar: { type: String },
  phone: { type: String, default: "" },
  gender: { type: String, default: "" },
  birthday: { type: String, default: "" },
  youtubeUrl: { type: String, default: "" },
  facebookUrl: { type: String, default: "" },
  tiktokUrk: { type: String, default: "" },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

const FundraiserSchema = new Schema({
  // _id
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  identificationCard: [String],
  identificationImage: { type: String, required: true },
  identificationNumber: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  type: { type: String, required: true },
  adminApproval: { type: Boolean, default: false },
  achievements: [String],
  groupName: { type: String, required: true },
  logo: { type: String, required: true },
  describe: { type: String, required: true },
});
const User = mongoose.model("users", UserSchema);
const Fundraiser = mongoose.model("fundraisers", FundraiserSchema);

module.exports = { User, Fundraiser };
