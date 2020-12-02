const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const jwtDecode = require('jwt-decode')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const routerIsAuth = express.Router()

app.post('/apiIsAuth', (req) => {
  const decoded = jwtDecode(req.body.user.stsTokenManager.accessToken)
  module.export = decoded
})

app.listen(5000)

module.exports = routerIsAuth
