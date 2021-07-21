const express = require("express")
const {
    getAllFavorites,
    createFavoriteForUser,
    deleteFavoriteForUser,
    updateFavoriteForUser
} = require("../controllers/user")

const router = express.Router()
const { protect } = require("../middleware/auth")

router.route("/getAllFavorites").get(protect, getAllFavorites)

router
    .route("/createFavoriteForUser")
    .post(protect, createFavoriteForUser)

router
    .route("/deleteFavoriteForUser")
    .delete(protect, deleteFavoriteForUser)

router
    .route("/updateFavoriteForUser")
    .put(protect, updateFavoriteForUser)

module.exports = router
