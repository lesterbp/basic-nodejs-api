exports.route = (app) => {
  const BASE_PATH = process.env.API_BASE_PATH
  console.log(`routes::route BASE_PATH is set to "${BASE_PATH}"`)
  const glossaryHandler = require('./lib/handlers/glossaryHandler')
  
  app.get(`${BASE_PATH}/glossary`, glossaryHandler.getTerms)
  app.get(`${BASE_PATH}/glossary/:term`, glossaryHandler.getTerm)
  app.delete(`${BASE_PATH}/glossary/:term`, glossaryHandler.deleteTerm)
  app.post(`${BASE_PATH}/glossary`, glossaryHandler.addTerm)
  app.put(`${BASE_PATH}/glossary/:term`, glossaryHandler.updateTerm)
}
