const express = require('express')

// Get the express Router object
const router = express.Router()

function routes(app) {
    // get message back from this private route
    router.get('/private', async (req, res) => {
        try {
            res.status(200).send({
                message: 'sample private message',
            })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

return router
}
module.exports = routes