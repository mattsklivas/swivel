const express = require('express')

// Get the express Router object
const router = express.Router()

// Import bcrypt for password encrypting
const bcrypt = require('bcrypt')

// Import the User data model
const UserModel = require('../definitions/user')

function routes(app) {
    // Get all users
    router.get('/', async (req, res) => {
        try {
            const users = await UserModel.find()
            res.json(users)
            res.status(200).send({
                message: 'Users retrieved from database',
            })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

    // User login
    router.post('/login', async (req, res) => {
        try {
            // Fetch the user details in the database
            const userDetails = await UserModel.findOne({ username: req.body.username })

            // Check if the user exists
            if (userDetails) {
                // Validate the given password
                const matches = await bcrypt.compare(req.body.password, userDetails.password)

                // If no match
                if (!matches) {
                    // Inform the client that the password is incorrect
                    return res.status(400).send({
                        message: 'Password is incorrect, please try again',
                    })
                }
            } else {
                // Inform the client that the user could not be found
                return res.status(400).send({
                    message: 'The given user provided could not be found',
                })
            }

            res.status(200).send({
                userName: userDetails.username,
                message: 'Login successful',
            })
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    // Register user
    router.post('/register', async (req, res) => {
        try {
             // Check is username exists and return 409 if so
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
                const usermodel = new UserModel({
                    email: req.body.email,
                    username: req.body.username
                })
                usermodel.save().then(data=> {res.json(data)}).catch(err => {res.json({message: err.message})})
             }
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    return router
}

module.exports = routes