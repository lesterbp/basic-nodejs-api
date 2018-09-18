const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')
const ws = require('./websocket')

const app = express()
const port = 3001
const wsPort = 3002

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
console.log(`API running on port ${port}`)

ws.startWebSocketServer(wsPort)
