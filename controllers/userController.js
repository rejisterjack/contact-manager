const asyncHandler = require("express-async-handler")
const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// @desc register user
// @route POST /api/users/register
// access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400)
    throw new Error("All fields are mandatory")
  }
  const userAvailable = await User.findOne({ email })
  if (userAvailable) {
    res.status(400)
    throw new Error("User already registered")
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  })
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email })
  } else {
    res.status(400)
    throw new Error("User data is not valid")
  }
})

// @desc login user
// @route POST /api/users/login
// access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error("All fields are mandatory")
  }
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    )
    res.status(201).json({ accessToken })
  } else {
    res.status(401)
    throw new Error("email or password is not valid")
  }
  res.json({ message: "login user" })
})

// @desc current user
// @route GET /api/users/current
// access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user)
})

module.exports = { registerUser, loginUser, currentUser }
