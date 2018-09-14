exports.route = (app) => {
  const glossaryHandler = require('./handlers/glossaryHandler')

  app.get('/glossary', glossaryHandler.getTerms)
  app.get('/glossary/:term', glossaryHandler.getTerm)
  app.delete('/glossary/:term', glossaryHandler.deleteTerm)
  app.post('/glossary', glossaryHandler.addTerm)
  app.put('/glossary/:term', glossaryHandler.updateTerm)
}
