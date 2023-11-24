const express = require("express");
const path = require("path");
// const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
// routes
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
// The GLOBAL ERROR HANDLER
const globalErrorHandler = require("./controllers/errorhandler");
const APPError = require("./utils/apperror");

const app = express();

// passport config
require("./controllers/auth")(passport);

// setting ejs layout
// app.use(expressLayouts);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// setting pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// serving static files
app.use(express.static(path.join(__dirname, "public")));

// app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

// Express's session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.authenticate("session"));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash Middleware
app.use(flash());

// Global flash variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  next();
});

app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);

// if other route unspecified route is hit then it goes to this!
app.all("*", (req, res, next) => {
  next(new APPError(`Can not find ${req.method} ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
