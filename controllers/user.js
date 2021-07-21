let UserSchema = require("../models/UserAccount")
const asyncHandler = require("../middleware/async")
const ErrorResponse = require("../utils/errorResponse")

/* 
@desc    Get all favorites for a user
@route   GET /FoodAPI/v1/getAllFavorites
@access  Private 
*/
exports.getAllFavorites = asyncHandler(async (req, res, next) => {
    // find user
    let user = await UserSchema.find({
        email: req.body.email
    })

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
        await UserSchema.findOneAndUpdate(
            { _id: req.body.id },
            { $addToSet: { favorites: req.body.text } }
        )

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
        await UserSchema.findOneAndUpdate(
            { _id: req.body.id },
            { $pull: { favorites: req.body.text } }
        )

        res.status(201).json({
            success: true,
            data: "Removed a favorite for the user",
            action: `Removed an existing favorite for the user: ${req.body.text}`
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
        const User = await UserSchema.findOneAndUpdate(
            {
                _id: req.body.id,
                favorites: req.body.existingFavorite.toString()
            },
            {
                $set: {
                    "favorites.$": req.body.updatedFavorite.toString()
                }
            }
        )

        res.status(201).json({
            success: true,
            action: `Updated an existing favorite: ${req.body.existingFavorite} => ${req.body.updatedFavorite}`
        })
    }
)
