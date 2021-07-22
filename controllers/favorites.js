const Favorite = require("../models/Favorite")
const UserSchema = require("../models/UserAccount")
const colors = require("colors")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")

/* 
@desc    Get all favorites
@route   Get /FoodAPI/v1/favorites
@access  Public 
*/
exports.getFavorites = asyncHandler(async (req, res, next) => {
    const favs = await Favorite.find()

    res.status(200).json({
        success: true,
        data: favs,
        action: "Got all favorites"
    })
})

/* 
@desc    Get all a favorite
@route   Get /FoodAPI/v1/favorites/:id
@access  Public 
*/
exports.getFavorite = asyncHandler(async (req, res, next) => {
    const fav = await Favorite.findById(req.params.id)

    if (!fav) {
        return new ErrorResponse(
            `Favorite with id ${req.params.id} not found`,
            404
        )
    }

    res.status(200).json({
        success: true,
        data: fav,
        action: `Got favorite with id ${req.params.id}`
    })
})

/* 
@desc    Create a new favorite
@route   POST /FoodAPI/v1/favorites/:id
@access  Private 
*/
exports.createFavorite = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user._id

    const fav = await Favorite.create(req.body)

    res.status(201).json({
        success: true,
        data: fav,
        action: "Created a new favorite"
    })
})

/* 
@desc    Update an existing favorite
@route   PUT /FoodAPI/v1/favorites/:id
@access  Private 
*/
exports.updateFavorite = asyncHandler(async (req, res, next) => {
    const fav = await Favorite.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )

    if (!fav) {
        return res.status(400).json({ success: false })
    }

    res.status(200).json({
        success: true,
        data: fav,
        action: `Updated an existing favorite with id ${req.params.id}`
    })
})

/* 
@desc    Delete an existing favorite
@route   DELETE /FoodAPI/v1/favorites/:id
@access  Private 
*/
exports.deleteFavorite = asyncHandler(async (req, res, next) => {
    const fav = await Favorite.findByIdAndDelete(req.params.id)

    if (!fav) {
        return res.status(400).json({ success: false })
    }

    res.status(200).json({
        success: true,
        data: fav,
        action: `Deleted an existing favorite with id ${req.params.id}`
    })
})
