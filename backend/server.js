require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const port = 5001;


// Middleware

// Mongoose connection
mongoose.connect('mongodb+srv://ruhulamin010398:25XLmIYd4ygng027@cluster0.pqvspyo.mongodb.net/ruhulinfo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors({
  origin: process.env.APP_URL, // Replace with your React app's URL
  credentials: true
}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


// Routes
const postRoutes = require('./routes/posts');
const uploadRoutes = require('./routes/upload');
app.use('/api/auth', authRoutes);


app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes);


app.get("/api/profile", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});