const express = require('express')
const cors = require('cors')
const next = require('next')
const {expressjwt: expressJwt} = require('express-jwt')
const jwks = require('jwks-rsa')
const mongoose = require('mongoose')

// Import dotenv to get environment variables
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Environment variables
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const DB_URL = dev ? 'mongodb://localhost:27017' : process.env.DATABASE_URL
const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL
const AUTH0_AUD = process.env.AUTH0_AUD
const API_URL = process.env.API_URL || 'http://localhost:3000/'

const jwtCheck = expressJwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${AUTH0_ISSUER_BASE_URL}.well-known/jwks.json`
        }),
        audience: AUTH0_AUD,
        issuer: AUTH0_ISSUER_BASE_URL,
        algorithms: ['RS256'],
})

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

// Get next app
const app = next({ dir: './src', dev })

// Request handler
const handle = app.getRequestHandler()
const server = express()

// Create express server
app.prepare().then(() => {
    server.use(cors(API_URL))

    // Include 'user' routes
    const userRoutes = require('./routes/user')
    server.use('/api/user', jwtCheck, userRoutes(server))

    // include 'sample' routes, only a demo for using jwttoken authorization
    const sampleRoute = require('./routes/sample')
    server.use('/api/sample', jwtCheck, sampleRoute(server)) // pass the jwtCheck to authorize token
    
    // Obtain any route and handle the request
    server.get('*', (req, res) => handle(req, res))

    // Listen on the provided port
    server.listen(PORT, err => {
        if (err) {
            throw err
        }
    })

    // Fix for local node CONNREFUSED error
    server.listen(80, err => {
        if (err) {
            throw err
        }
    })
})
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})