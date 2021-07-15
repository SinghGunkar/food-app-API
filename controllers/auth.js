const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const User = require("../models/UserAccount")

/* 
@desc    Register a user
@route   POST /FoodAPI/v1/auth/registerUser
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

/* 
@desc    Login a user
@route   POST /FoodAPI/v1/login
@access  Public 
*/
exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    // Validate email and password
    if (!email || !password) {
        return next(
            new ErrorResponse(
                "Email or password (or both) is missing",
                400
            )
        )
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401))
    }

    // Check if password is valid
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401))
    }

    // Create token
    const token = user.getSignedJWTToken()

    res.status(200).json({
        success: true,
        token: token,
        action: "User logged in"
    })
})
