const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  type: String, // Add this line
  message: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", contactSchema);
