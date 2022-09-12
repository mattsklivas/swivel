const express = require('express')

const router = express.Router()

function routes(app) {
  router.get('/index', (req, res) => {
    res.end('Testing')
  })
  
  router.get('/test/:id', (req, res) => {
    return app.render(req, res, '/test', { id: req.params.id })
  })

  return router
}

module.exports = routes