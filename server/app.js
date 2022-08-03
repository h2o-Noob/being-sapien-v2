const express = require('express')
const errorMiddleware = require("./middleware/error")
const dotenv = require("dotenv")
const app = express();
const path = require("path")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileUpload")

app.use(express.json())
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }))

dotenv.config({ path: "config/config.env" })

const reports = require("./routes/ReportRoutes")
app.use("/", reports)

const users = require("./routes/UserRoutes")
app.use("/", users)

// error middleware
app.use(errorMiddleware)

module.exports = app