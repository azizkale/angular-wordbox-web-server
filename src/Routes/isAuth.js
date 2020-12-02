// const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const jwtDecode = require('jwt-decode')

const routerIsAuth = express.Router()

routerIsAuth.use(bodyParser.json())

routerIsAuth
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
  })
  .post((req) => {
    const decoded = jwtDecode(req.body.user.stsTokenManager.accessToken)
    console.log(decoded)
    module.export = decoded
  })

module.exports = routerIsAuth
