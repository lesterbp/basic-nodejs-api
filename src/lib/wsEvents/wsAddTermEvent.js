const WsClientEvent = require('./WsClientEvent')

module.exports = class WsAddTermEvent extends WsClientEvent {
  constructor (payload = {}, eventType = 'defaultEvent') {
    super(payload, 'addTerm')
  }
}
