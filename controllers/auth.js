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
        password,
        favorites: []
    })

    // Send cookie
    sendTokenResponse(user, 200, res)
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

    // Send cookie
    sendTokenResponse(user, 200, res)
})

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJWTToken()

    const options = {
        expires: new Date(
            Date.now() +
                process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        // cookie assible via client side script only
        httpOnly: true
    }

    // Use https for production mode
    if (process.env.NODE_ENV === "production") {
        options.secure = true
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        action: "Sent cookie"
    })
}

/* 
@desc    Get current logged in user
@route   POST /FoodAPI/v1/me
@access  Private
*/
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        data: user,
        action: "Got current (logged in) user"
    })
})

/* 
@desc    Log out current user, clear cookie
@route   Get /FoodAPI/v1/logOut
@access  Private
*/
exports.logoutUser = asyncHandler(async (req, res, next) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        data: "Logged out user"
    })
})
