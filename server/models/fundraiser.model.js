const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FundraiserSchema = new Schema({
  // _id
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  fullname: { type: String, required: true },
  birthday: { type: String, required: true },
  numberPhone: { type: String, required: true },
  emailContact: { type: String, required: true },
  identificationCard: [String],
  identificationImage: { type: String },
  type: { type: String, required: true },
  adminApproval: { type: Boolean, default: false },
  groupName: { type: String, required: true },
  describe: { type: String, required: true },
  introLink: { type: String, required: true },
  approvaldate: { type: Date, default: null },
});

module.exports = mongoose.model("fundraisers", FundraiserSchema);
