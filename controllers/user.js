let UserSchema = require("../models/UserAccount")
const asyncHandler = require("../middleware/async")
const ErrorResponse = require("../utils/errorResponse")
const mongoose = require("mongoose")

/* 
@desc    Get all favorites for a user
@route   GET /FoodAPI/v1/getAllFavorites
@access  Private 
*/
exports.getAllFavorites = asyncHandler(async (req, res, next) => {
    const query = {
        email: req.body.email
    }

    let user = await UserSchema.find(query)

    res.status(200).json({
        success: true,
        data: user[0].favorites,
        action: `Got all favorites for ${req.body.email}`
    })
})

/* 
@desc    Creates a favorite for a user
@route   POST /FoodAPI/v1/createFavoriteForUser
@access  Private 
*/
exports.createFavoriteForUser = asyncHandler(
    async (req, res, next) => {
        const favObject = { text: req.body.text }
        const query = { _id: req.body.user_id }
        const update = { $push: { favorites: favObject } }
        console.log(req.body)
        const user = await UserSchema.findOneAndUpdate(query, update)

        if (!user) {
            return res.status(400).json({ success: false })
        }

        res.status(201).json({
            success: true,
            action: `Created a new favorite for the user: ${req.body.text}`
        })
    }
)

/* 
@desc    Delete a favorite for a user
@route   DELETE /FoodAPI/v1/deleteFavorite
@access  Private 
*/
exports.deleteFavoriteForUser = asyncHandler(
    async (req, res, next) => {
        const query = {
            _id: mongoose.Types.ObjectId(req.body.user_id)
        }
        const update = {
            $pull: { favorites: { _id: req.body.fav_id } }
        }

        const user = await UserSchema.findOneAndUpdate(query, update)

        if (!user) {
            return res.status(400).json({ success: false })
        }

        res.status(201).json({
            success: true,
            action: "Removed an existing favorite for the user"
        })
    }
)

/* 
@desc    Updates a favorite for a user
@route   PUT /FoodAPI/v1/updateUserFavorite
@access  Private 
*/
exports.updateFavoriteForUser = asyncHandler(
    async (req, res, next) => {
        const query = {
            _id: mongoose.Types.ObjectId(req.body.user_id),
            "favorites._id": req.body.fav_id.toString()
        }

        const update = {
            $set: { "favorites.$.text": req.body.updatedFavorite }
        }

        const user = await UserSchema.findOneAndUpdate(query, update)

        if (!user) {
            return res.status(400).json({ success: false })
        }

        res.status(201).json({
            success: true,
            action: `Updated an existing favorite`
        })
    }
)
