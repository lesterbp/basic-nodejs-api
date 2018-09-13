exports.route = (app) => {
  const glossaryHandler = require('./handlers/glossaryHandler')

  app.get('/', glossaryHandler.getTerms)
}