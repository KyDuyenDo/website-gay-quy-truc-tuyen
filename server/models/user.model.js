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
  intro: { type: String, default: "" },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

const FundraiserSchema = new Schema({
  // _id
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  fullname: { type: String, required: true },
  birthday: { type: String, required: true },
  numberPhone: { type: String, required: true },
  emailContact: { type: String, required: true },
  identificationCard: [String],
  identificationImage: { type: String, required: true },
  type: { type: String, required: true },
  adminApproval: { type: Boolean, default: false },
  groupName: { type: String, required: true },
  describe: { type: String, required: true },
  introLink: { type: String, required: true },
  approvaldate: { type: Date, default: null },
});
const User = mongoose.model("users", UserSchema);
const Fundraiser = mongoose.model("fundraisers", FundraiserSchema);

module.exports = { User, Fundraiser };
