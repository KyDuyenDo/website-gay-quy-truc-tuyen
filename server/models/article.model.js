const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  // _id
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  categotyId: {
    type: Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  addressId: { type: Schema.Types.ObjectId, ref: "addresses", required: true },
  address: { type: String, require: true },
  addedBy: { type: String, require: true },
  createdAt: { type: Date, default: Date.now, required: true },
  articletitle: { type: String, require: true },
  image: [String],
  body: { type: String, require: true },
  state: { type: String, require: true },
  expireDate: { type: Number, require: true },
  releaseDate: { type: Date, require: true },
  accountNumber: { type: String, require: true },
  emailPayPal: { type: String, require: true },
  methodPayment: { type: String, require: true },
  bankcode: { type: String, require: true },
  adminApproval: { type: Boolean, require: true },
  published: { type: Boolean, require: true },
  amountRaised: { type: Number },
  amountEarned: { type: Number },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: "activities",
    },
  ],
  disbursements: [
    {
      type: Schema.Types.ObjectId,
      ref: "disbursements",
    },
  ],
});

module.exports = mongoose.model("articles", ArticleSchema);
