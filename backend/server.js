const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Add this

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const port = 5001;

// Passport configuration
// require('./config/passport');

// Middleware

// Mongoose connection
mongoose.connect('mongodb+srv://ruhulamin010398:25XLmIYd4ygng027@cluster0.pqvspyo.mongodb.net/ruhulinfo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors({
  origin: "http://localhost:5173", // Replace with your React app's URL
  credentials: true
}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(session({
  secret: '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',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://ruhulamin010398:25XLmIYd4ygng027@cluster0.pqvspyo.mongodb.net/ruhulinfo?retryWrites=true&w=majority' }) // Use MongoStore
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: '269620871081-eia0foqvg036uf26jnnkv6plamhfla34.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:5001/auth/google/callback'
},
  (token, tokenSecret, profile, done) => {
    console.log("passportjs_______", profile);
    console.log("passportjs emails _______", profile.emails);
    console.log("passportjs emails _______", profile.emails[0].value);
    return done(null, profile);
  }));



passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes
const postRoutes = require('./routes/posts');
const uploadRoutes = require('./routes/upload');

app.get('/auth/check', (req, res) => {
  console.log(" req.isAuthenticated()", req.isAuthenticated())
  res.json({ isAuthenticated: req.isAuthenticated() });
});
app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes);

// Auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // res.redirect('/profile');
    res.redirect("http://localhost:5173/admin/profile");
  });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect("http://localhost:5173/admin/profile");
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
};
app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});