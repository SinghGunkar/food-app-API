/* 
This code in this file is not used for any API functionality. 
I have kept this file in the project for me personal reference 
- GS
 */

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
