const express = require('express')

// Get the express Router object
const router = express.Router()

// Import the User data model
const UserModel = require('../definitions/listing')

function routes(app) {
    // Get all listings
    router.get('/all', async (req, res) => {
        try {
            // Fetch the user details in the database
            const userDetails = await UserModel.findOne({ username: req.body.username })

            res.status(200).send({
                userName: userDetails.username,
                message: 'Login successful',
            })
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    return router
}

module.exports = routes