const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

// routes
const userRoutes = require("./routes/userRoutes");
const viewRoutes = require("./routes/viewRoutes");

const app = express();

// setting ejs layout
app.use(expressLayouts);
app.set("view engine", "ejs");

// serving static files
app.use(express.static(path.join(__dirname, "public")));

// app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10kb" }));

app.use("/", viewRoutes);
app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new APPError(`Can not find ${req.method} ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
