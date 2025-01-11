const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  featureImage: String,  // Add this line
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);