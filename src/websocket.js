const WebSocketServer = require('ws').Server
const eventHandler = require('./lib/handlers/wsEventHandler')

exports.startWebSocketServer = (port) => {
  const wss = new WebSocketServer({ port })
  exports.instance = wss
  wss.on('connection', eventHandler.onConnect)
  wss.on('close', eventHandler.onDisconnect)
  wss.on('message', eventHandler.onMessage)
  console.log(`WebSocket running on port ${port}`)
}
