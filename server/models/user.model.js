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

module.exports = mongoose.model("users", UserSchema);
