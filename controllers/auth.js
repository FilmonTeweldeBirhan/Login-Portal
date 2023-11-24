// const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      catchAsync(async (email, password, done) => {
        // check if the email exists
        const user = await User.findOne({ email }).select("+password");
        if (!user)
          return done(null, false, {
            message: "No user found with that email.",
          });

        // check if the password is correct
        const isMatch = await user.correctPassword(password, user.password);
        if (!isMatch)
          return done(null, false, { message: "Invalid password." });

        // i didn't won't to leak the password too!
        return done(null, user);
      })
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser(
    catchAsync(async (id, done) => {
      const user = await User.findById(id);
      if (!user) return done(null, false);
      return done(null, user);
    })
  );
};
