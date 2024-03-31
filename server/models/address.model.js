const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdressSchema = new Schema({
  // _id
  city: { type: String },
  street: { type: String },
  county: { type: String },
  town: { type: String },
  detail: { type: String, required: true },
  lat: { type: String, required: true },
  lon: { type: String, required: true },
});

module.exports = mongoose.model("addresses", AdressSchema);
