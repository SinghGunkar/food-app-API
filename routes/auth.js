const express = require("express")
const { registerUser } = require("../controllers/auth")

const router = express.Router()

router.get("/registerUser", registerUser)

module.exports = router
