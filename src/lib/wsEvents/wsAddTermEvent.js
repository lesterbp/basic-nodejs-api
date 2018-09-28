const WsClientEvent = require('./wsClientEvent')

module.exports = class WsAddTermEvent extends WsClientEvent {
  constructor (payload = {}, eventType = 'defaultEvent') {
    super(payload, 'addTerm')
  }
}
