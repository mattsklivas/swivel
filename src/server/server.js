const express = require('express')
const cors = require('cors')
const next = require('next')
const {expressjwt: expressJwt} = require('express-jwt')
const jwks = require('jwks-rsa')

// Port and dev environment
const PORT = process.env.PORT || 3001
const dev = process.env.NODE_ENV !== 'production'
const appO =  'http://localhost:3000'

const jwtCheck = expressJwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-gl5357kx.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://intro/api',
  issuer: 'https://dev-gl5357kx.us.auth0.com/',
  algorithms: ['RS256'],
})

// Get next app
const app = express()
app.use(cors({origin:appO}))

app.get('/api/public',(req,res) => {
    res.send({
        msg:'public endpoint'
    })
})

app.get('/api/private',jwtCheck ,(req,res) => {
   res.send({
       msg:'private endpoint'
   })
})

app.listen(PORT, ()=> console.log(`listening on port ${PORT} `))