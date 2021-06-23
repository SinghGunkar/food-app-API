const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        action: "Show all favorites"
    })
})

router.post("/", (req, res) => {
    res.status(200).json({
        success: true,
        action: "Create a new favorite"
    })
})

router.put("/:id", (req, res) => {
    res.status(200).json({
        success: true,
        action: `Update favorite with id ${req.params.id}`
    })
})

router.delete("/:id", (req, res) => {
    res.status(200).json({
        success: true,
        action: `Delete favorite with id ${req.params.id}`
    })
})

module.exports = router
