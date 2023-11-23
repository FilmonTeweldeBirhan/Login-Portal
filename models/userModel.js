const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    minlength: [3, "Name should have more than 2 characters"],
    maxlength: [30, "Name should have less than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validators: [validator.isEmail, "Submit a valid email address"],
  },
  photo: {
    type: String,
    default: "avatar.png",
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please Confirm your password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match",
    },
  },
  passwordChangedAt: Date,
  passwordRester: String,
  passwordResterExpiration: Date,
});

userSchema.pre("save", async function (next) {
  // check if the user modified his/her password
  if (!this.isModified("password")) return next();
  // check if the user is new if not create a passwordChangedAt prop.
  if (!this.isNew) {
    // substracting 1000 just to make sure it goes first than token.
    this.passwordChangedAt = Date.now - 1000;
  }

  // then hash the password with 12 power
  this.password = await bcrypt.hash(this.password, 12);
  // then after all delete the passwordConfirm
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
