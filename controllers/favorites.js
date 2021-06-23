/* 
@desc    Get all favorites
@route   Get /FoodAPI/v1/favorites
@access  Public 
*/
exports.getFavorites = (req, res, next) => {
    res.status(200).json({
        success: true,
        action: "Show all favorites"
    })
}

/* 
@desc    Create a new favorite
@route   Get /FoodAPI/v1/favorites/:id
@access  Public 
*/
exports.createFavorite = (req, res, next) => {
    res.status(200).json({
        success: true,
        action: "Create a new favorite"
    })
}
