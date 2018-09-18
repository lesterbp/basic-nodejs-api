exports.onConnect = (ws) => {
  console.log('wsEventHandler::onConnect a client has connected')
}

exports.onDisconnect = (ws) => {
  console.log('wsEventHandler::onConnect a client has disconnected')
}

exports.onMessage = (payload) => {
  console.log(`wsEventHandler::onMessage received message with payload: ${payload}`)
}
