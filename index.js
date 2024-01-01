const express = require("express")
const app = express()
const logger = require("morgan")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 3001

app.use(logger("dev"))
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))

app.listen(port, () => {
  console.log(`PORT: ${port}, server is running...`)
})
