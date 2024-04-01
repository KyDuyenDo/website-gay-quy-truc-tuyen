const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotifySchema = new Schema({
  // _id
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  message: { type: String, required: true },
  state: { type: String, require: true },
  time: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("notifies", NotifySchema);
