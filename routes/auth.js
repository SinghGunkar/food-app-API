const express = require("express")
const {
    registerUser,
    loginUser,
    getMe,
    logoutUser
} = require("../controllers/auth")

const router = express.Router()

const { protect } = require("../middleware/auth")

router.post("/registerUser", registerUser)
router.post("/login", loginUser)
router.get("/me", protect, getMe)
router.get("/logout", logoutUser)

module.exports = router
