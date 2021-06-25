const mongoose = require("mongoose")
const colors = require("colors")

const connectDB = async () => {
    const connectionString = process.env.MONGO_URI

    const connection = await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

    console.log(
        `MongoDB Connected: ${connection.connection.host}`.green.bold
    )
}

module.exports = connectDB
