const express = require('express')
const next = require('next')
const mongoose = require('mongoose')

// Port and dev environment
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const DB_URL = dev ? 'mongodb://localhost:27017' : process.env.DATABASE_URL

// Get next app
const app = next({ dir: './src', dev })

// Request handler
const handle = app.getRequestHandler()

// Connect to MongoDB
if (dev) {
    // Local connection
    mongoose
    .connect(DB_URL)
    .then(() => {
        console.log('Connected to local MongoDB instance')
    })
    .catch((err) => console.error(`Error: ${err.message}`))
} else {
    // TODO: MongoDB connection over Atlas
}

// Create express server
app.prepare().then(() => {
    const server = express()

    // Include 'user' routes
    const userRoutes = require('./routes/user')
    server.use('/api/user', userRoutes(server))

    // Obtain any route and handle the request
    server.get('*', (req, res) => handle(req, res) )

    // Listen on the provided port
    server.listen(PORT, err => {
        if (err) {
            throw err
        }
    })
})
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})