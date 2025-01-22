const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

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