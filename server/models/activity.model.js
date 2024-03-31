const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  // _id
  addedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  articleId: { type: Schema.Types.ObjectId, ref: "articles", required: true },
  image: { type: String },
  state: { type: String },
  createdAt: { type: Date, default: Date.now, required: true },
  body: { type: String },
  title: { type: String },
  amountSpent: { type: Number },
  document: [String],
});

module.exports = mongoose.model("activities", ActivitySchema);
