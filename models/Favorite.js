const mongoose = require("mongoose")

const FavoriteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please add a favorite"],
        trim: true,
        maxlength: [
            100,
            "Favorite cannot be more than 50 characters"
        ],
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        }
    }
})

module.exports = mongoose.model("Favorite", FavoriteSchema)
