const express = require("express")
const {
    getFavorites,
    getFavorite,
    createFavorite,
    updateFavorite,
    deleteFavorite
} = require("../controllers/favorites")

const router = express.Router()
const { protect } = require("../middleware/auth")

router
    .route("/")
    .get(protect, getFavorites)
    .post(protect, createFavorite)

router
    .route("/:id")
    .get(protect, getFavorite)
    .put(protect, updateFavorite)
    .delete(protect, deleteFavorite)

module.exports = router
