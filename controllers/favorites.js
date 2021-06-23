/* 
@desc    Get all favorites
@route   Get /FoodAPI/v1/favorites
@access  Public 
*/
exports.getFavorites = (req, res, next) => {
    res.status(200).json({
        success: true,
        action: "Get all favorites"
    })
}

/* 
@desc    Get all a favorite
@route   Get /FoodAPI/v1/favorites/:id
@access  Public 
*/
exports.getFavorite = (req, res, next) => {
    res.status(200).json({
        success: true,
        action: `Get favorite with id ${req.params.id}`
    })
}

/* 
@desc    Create a new favorite
@route   POST /FoodAPI/v1/favorites/:id
@access  Private 
*/
exports.createFavorite = (req, res, next) => {
    res.status(200).json({
        success: true,
        action: "Create a new favorite"
    })
}

/* 
@desc    Update an existing favorite
@route   PUT /FoodAPI/v1/favorites/:id
@access  Private 
*/
exports.updateFavorite = (req, res, next) => {
    res.status(200).json({
        success: true,
        action: `Update an existing favorite with id ${req.params.id}`
    })
}

/* 
@desc    Delete an existing favorite
@route   DELETE /FoodAPI/v1/favorites/:id
@access  Private 
*/
exports.deleteFavorite = (req, res, next) => {
    res.status(200).json({
        success: true,
        action: `Delete an existing favorite with id ${req.params.id}`
    })
}
