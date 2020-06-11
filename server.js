const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();
const User = require("./models/User");

app.use(express.json({ extended: false }));

// set express session
app.use(
  require("express-session")({
    secret: "Anything I want",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Facebook Passport Strategy
const FacebookStrategy = require("passport-facebook").Strategy;
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.REACT_APP_FACEBOOK_APP_ID,
      clientSecret: process.env.REACT_APP_FACEBOOK_APP_SECRET,
      callbackURL: "/api/fbauth/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // runs when logging in
      let user = await User.findOne({ userID: profile.id });
      if (!user) {
        console.log("new user");
        user = new User({
          userID: profile.id,
          name: profile.displayName,
          email: profile.email,
        });
        await user.save();
        return cb(null, user);
      } else {
        console.log("existing user");
        return cb(null, user);
      }
    }
  )
);

// Google Passport Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.REACT_APP_GOOGLE_APP_ID,
      clientSecret: process.env.REACT_APP_GOOGLE_APP_SECRET,
      callbackURL: "/api/ggauth/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // runs when logging in
      let user = await User.findOne({ userID: profile.id });
      if (!user) {
        console.log("new user");
        user = new User({
          userID: profile.id,
          name: profile.name.givenName + " " + profile.name.familyName,
        });
        await user.save();
        return cb(null, user);
      } else {
        console.log("existing user");
        return cb(null, user);
      }
    }
  )
);

// Define routes
app.use("/api/fbauth", require("./routes/facebookAuth"));
app.use("/api/ggauth", require("./routes/googleAuth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/competitions", require("./routes/competitions"));
app.use("/api/purchases", require("./routes/purchases"));
app.use("/api/friends", require("./routes/friends"));
app.use("/api/search", require("./routes/search"));
// app.use('/api/middleware', require('./routes/middleware'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
