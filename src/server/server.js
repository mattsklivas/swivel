const express = require('express')
const cors = require('cors')
const next = require('next')
const {expressjwt: expressJwt} = require('express-jwt')
const jwks = require('jwks-rsa')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Import dotenv to get environment variables
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
require('dotenv').config()

// Environment variables
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const DB_URL = dev ? 'mongodb://localhost:27017' : process.env.DATABASE_URL // use 'mongodb://mongo:27017' for docker
const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL
const AUTH0_AUD = process.env.AUTH0_AUD
const API_URL = process.env.API_URL || 'http://localhost:3000/'

const jwtCheck = expressJwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-gl5357kx.us.auth0.com/.well-known/jwks.json'
        }),
        audience: AUTH0_AUD,
        issuer: AUTH0_ISSUER_BASE_URL,
        algorithms: ['RS256'],
})

if (dev) {
    // Local connection
    mongoose
    .connect(DB_URL)
    // .connect(process.env.MONGO_URI)
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

// this is used to convert to json in the console log
server.use(bodyParser.json())

// Create express server
app.prepare().then(() => {
    server.use(cors(API_URL))
    server.use(bodyParser.json())

    // Include 'user' routes
    const userRoutes = require('./routes/user')
    server.use('/api/user', jwtCheck, userRoutes(server))

    // Include 'listing' routes
    const listingRoutes = require('./routes/listing')
    server.use('/api/listing', jwtCheck, listingRoutes(server))

    // Include route for registration redirect
    const registerRedirect = require('./routes/register')
    server.use('/api/register', registerRedirect(server))
    
    // Obtain any route and handle the request
    server.get('*', (req, res) => handle(req, res))

    // Error handling
    server.use((err, req, res, _next) => {
        res.status(err.status).json(err)
    })

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
