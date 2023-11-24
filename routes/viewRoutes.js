const express = require("express");
const passport = require("passport");
const { protected, goToAuth } = require("./../utils/authHelper");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", protected, (req, res) => {
  res.render("dashboard");
});

router.get("/signup", goToAuth, (req, res) => {
  res.render("signup");
});

router.get("/login", goToAuth, (req, res) => {
  res.render("login");
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Logged out successfully.");
  res.redirect("/login");
});

module.exports = router;
