const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
  // _id
  articleId: { type: Schema.Types.ObjectId, ref: "articles", required: true },
  paymentId: { type: Schema.Types.ObjectId, ref: "payments", required: true },
  donorId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    default: new mongoose.Types.ObjectId(),
  },
  fullnameDonor: { type: String, require: true },
  donationAmount: { type: Number, require: true },
  donationDate: { type: Date, default: Date.now, required: true },
  anonymous: { type: Boolean, default: false },
});

module.exports = mongoose.model("donations", DonationSchema);
