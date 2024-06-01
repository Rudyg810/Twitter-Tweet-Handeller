const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  twitterId: {
    type: {
      username: String,
      email: String,
      password: String
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
