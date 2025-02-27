const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/Post');

const authMiddleware = require('../middleware/auth.middleware');

// Set up multer for file storage


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Create a new post with a feature image
router.post('/', authMiddleware, upload.single('featureImage'), async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    featureImage: req.file ? req.file.path : null
  });
  await newPost.save();
  res.json(newPost);
});

router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

module.exports = router;