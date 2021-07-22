// imports
const express = require("express")
const dotenv = require("dotenv")
const logger = require("./middleware/logger")
const morgan = require("morgan")
const connectDB = require("./config/db")
const colors = require("colors")
const errorHandler = require("./middleware/error")
const cookieParser = require("cookie-parser")
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")
const xss = require("xss-clean")
const hpp = require("hpp")
const cors = require("cors")

// Route files
const auth = require("./routes/auth")
const user = require("./routes/user")

// Load env vars
dotenv.config({ path: "./config/config.env" })

// Connect to database
connectDB()

const app = express()

// Cookie parser
app.use(cookieParser())

// Body parser middleware (needed for JSON objects)
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Prevent noSQL injection and Sanitize Data
app.use(mongoSanitize())

// Set security headers and prevent XSS attacks
app.use(helmet())
app.use(xss())

// Prevent http param pollution
app.use(hpp())

// Enable cors for chrome
app.use(cors())

// Mount router(s) with default endpoint
app.use("/FoodAPI/v1/auth", auth)
app.use("/FoodAPI/v1/user", user)

// Error handler middleware
app.use(errorHandler)

app.listen()

const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on ${PORT}`
            .green.bold.underline
    )
)

// Handle promise unhandled rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    server.close(() => process.exit(1))
})
