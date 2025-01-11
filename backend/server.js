










const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb+srv://ruhulamin010398:25XLmIYd4ygng027@cluster0.pqvspyo.mongodb.net/ruhulinfo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const postRoutes = require('./routes/posts');
const uploadRoutes = require('./routes/upload'); // Add this line

app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes); // Add this line

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});