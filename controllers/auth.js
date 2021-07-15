const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const User = require("../models/UserAccount")

/* 
@desc    Register a user
@route   GET /FoodAPI/v1/auth
@access  Public 
*/
exports.registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, role, password } = req.body

    // Create user
    const user = await User.create({
        name,
        email,
        role,
        password
    })

    // Create token
    const token = user.getSignedJWTToken()

    res.status(200).json({
        success: true,
        token: token,
        action: "Registered a user"
    })
})
