const express = require('express')

// Get the express Router object
const router = express.Router()

// Import the User data model
const UserModel = require('../definitions/user')

function routes(app) {
    // Register user in the database
    router.post('/', async (req, res) => {
        try {
             // Check if username already exists, return 409 if so
            const existsUser = await UserModel.findOne({ username: req.body.username })
            const existsEmail = await UserModel.findOne({ email: req.body.email })

            if (existsUser) {
                return res.status(409).json({
                    message: 'An account with the username provided already exists',
                })
            }else if (existsEmail) {
                return res.status(409).json({
                    message: 'An account with the email provided already exists',
                })
            }else{
                // Build the user model and save it to the db
                const user = new UserModel({
                    email: req.body.email,
                    username: req.body.username,
                    fname: '',
                    lname: '',
                    location: '',
                    description: '',
                    avatar: ''
                })
                user.save().then(data=> {res.json(data)}).catch(err => {res.json({message: err.message})})
            }
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    return router
}

module.exports = routes