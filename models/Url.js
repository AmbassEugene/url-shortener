const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  createdAt: { type: String, default: Date.now },
});

module.exports = mongoose.model("Url", UrlSchema);
