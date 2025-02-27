const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: String,
  des: String,
  featureImage: String,  // Add this line
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Category', categorySchema);