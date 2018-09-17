module.exports = class Response {
  constructor () {
    this.statusCode = 200
  }

  json (json) {
    this.jsonBody = json
    return this
  }

  status (status) {
    this.statusCode = status
    return this
  }
}
