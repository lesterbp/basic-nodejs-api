const ws = require('../../websocket')

module.exports = class WsClientEvent {
  constructor (payload = {}, eventType = 'defaultEvent') {
    this.eventType = eventType
    this.payload = payload
  }

  broadcast () {
    const data = {
      eventType: this.eventType,
      payload: this.payload
    }
    console.log('WsClientEvent::broadcast')
    console.log(data)
    ws.instance.clients.forEach(ws => {
      ws.send(JSON.stringify(data))
    })
  }
}
