const User = require("./../models/userModel");
const APPError = require("./../utils/apperror");
const catchAsync = require("./../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});
