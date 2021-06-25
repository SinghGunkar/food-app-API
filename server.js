// imports
const express = require("express")
const dotenv = require("dotenv")
const logger = require("./middleware/logger")
const morgan = require("morgan")
const connectDB = require("./config/db")
const colors = require("colors")

// Route files
const favorites = require("./routes/favorites")

// Load env vars
dotenv.config({ path: "./config/config.env" })

// Connect to database
connectDB()

const app = express()

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Mount router(s) with default endpoint
app.use("/FoodAPI/v1/favorites", favorites)

app.listen()

const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on ${PORT}`
            .green.bold
    )
)

// Handle promise unhandled rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    server.close(() => process.exit(1))
})
