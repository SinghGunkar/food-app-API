const mongoose = require("mongoose")

const FavoriteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please add a favorite"],
        unique: true,
        trim: true,
        maxlength: [50, "Favorite cannot be more than 50 characters"]
    }
})

module.exports = mongoose.model("Favorite", FavoriteSchema)
