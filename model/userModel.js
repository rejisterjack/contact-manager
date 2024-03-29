const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email address already taken"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
})

module.exports = mongoose.model("User", userSchema)
