const express = require("express")
const {
    getFavorites,
    getFavorite,
    createFavorite,
    updateFavorite,
    deleteFavorite
} = require("../controllers/favorites")

const router = express.Router()

router.route("/").get(getFavorites).post(createFavorite)

router
    .route("/:id")
    .get(getFavorite)
    .put(updateFavorite)
    .delete(deleteFavorite)

module.exports = router
