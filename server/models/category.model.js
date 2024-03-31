const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  // _id
  description: { type: String },
  icon: { type: String },
  popular: { type: Number, default: 0 },
  title: { type: String },
});

module.exports = mongoose.model("categories", CategorySchema);
