const express = require("express")
const app = express()
const logger = require("morgan")
const connectDB = require("./config/dbConnection")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 3001

connectDB()

app.use(logger("dev"))
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))

app.listen(port, () => {
  console.log(`PORT: ${port}, server is running...`)
})
