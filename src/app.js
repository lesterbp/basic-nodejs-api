const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()
const port = 3001

app.listen(port)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use((req, res, next) => {
  console.log(`${req.method}::${req.url}::${JSON.stringify(req.body)}`)
  res.set('Content-Type', 'application/vnd.api+json')
  next()
})
routes.route(app)
console.log(`app running on port ${port}`)
