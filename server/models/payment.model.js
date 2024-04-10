const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  // _id
  payerName: { type: String },
  payerEmail: { type: String },
  TradingCode: { type: String },
  TradingRef: { type: String },
  captureId: { type: String },
  method: { type: String, require: true },
  createDate: { type: Date, default: Date.now, required: true },
  status: { type: String, require: true },
  amount: { type: Number, require: true },
  tip: { type: Number, require: true },
});

module.exports = mongoose.model("payments", PaymentSchema);
