const express = require("express")
const dotenv = require("dotenv")

// Route files
const favorites = require("./routes/favorites")

// Load env vars
dotenv.config({ path: "./config/config.env" })

const app = express()

// Mount router(s) with default endpoint
app.use("/FoodAPI/v1/favorites", favorites)

app.listen()

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on ${PORT}`
    )
)
