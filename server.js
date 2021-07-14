// imports
const express = require("express")
const dotenv = require("dotenv")
const logger = require("./middleware/logger")
const morgan = require("morgan")
const connectDB = require("./config/db")
const colors = require("colors")
const errorHandler = require("./middleware/error")

// Route files
const favorites = require("./routes/favorites")
const auth = require("./routes/auth")

// Load env vars
dotenv.config({ path: "./config/config.env" })

// Connect to database
connectDB()

const app = express()

// Body parser middleware (needed for JSON objects)
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Mount router(s) with default endpoint
app.use("/FoodAPI/v1/favorites", favorites)
app.use("/FoodAPI/v1/auth", auth)

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
