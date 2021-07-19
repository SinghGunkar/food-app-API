let UserSchema = require("../models/UserAccount")
const asyncHandler = require("../middleware/async")

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
        const User = await UserSchema.findOneAndUpdate(
            { _id: req.body.id },
            { $addToSet: { favorites: req.body.text } }
        )

        console.log(User)

        res.status(201).json({
            success: true,
            data: "create fav for user",
            action: `Created a new favorite for the user`
        })
    }
)

/* 
@desc    Delete a favorite for a user
@route   DELETE /FoodAPI/v1/:text
@access  Private 
*/
exports.createFavoriteForUser = asyncHandler(
    async (req, res, next) => {
        const User = await UserSchema.findOneAndUpdate(
            { _id: req.body.id },
            { $addToSet: { favorites: req.body.text } }
        )

        console.log(User)

        res.status(201).json({
            success: true,
            data: "create fav for user",
            action: `Created a new favorite for the user`
        })
    }
)
