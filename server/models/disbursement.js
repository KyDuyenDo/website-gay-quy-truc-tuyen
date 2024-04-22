const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EvaluationSchema = new Schema({
  // _id
  articleId: { type: Schema.Types.ObjectId, ref: "articles", required: true },
  amountDisburse: { type: Number, require: true },
  step: { type: Number, require: true },
  time: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("disbursements", EvaluationSchema);
