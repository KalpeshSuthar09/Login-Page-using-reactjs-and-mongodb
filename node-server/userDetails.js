const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: "visitor",
    },
  }
);

const UserModel = mongoose.model("LoginInfo", UserDetailsSchema);
module.exports = UserModel;
