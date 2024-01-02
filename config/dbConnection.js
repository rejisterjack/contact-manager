const { default: mongoose } = require("mongoose")

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.DB_URL)
  console.log(
    "Database Connected, ",
    connect.connection.host,
    connect.connection.name
  )
  try {
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB