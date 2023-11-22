const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign up" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

module.exports = router;
