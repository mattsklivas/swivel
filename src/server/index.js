const express = require('express')
const next = require('next')

// Port and dev environment
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

// 
const app = next({ dir: './src', dev })

// Request handler
const handle = app.getRequestHandler()

// Testing

app
    .prepare()
    .then(() => {
        const server = express()
        const showRoutes = require('./routes/index')

        server.use('/api', showRoutes(server))

        // Grab any route and handle the request
        server.get('*', (req, res) => handle(req, res) )

        server.listen(PORT, err => {
        if (err) {
            throw err
        }
        console.log(`Ready on port ${PORT}`)
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })