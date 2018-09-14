const glossaryDb = require('../databases/glossaryDatabase')

exports.getTerms = async (req, res) => {
  try {
    const result = await glossaryDb.getAllTerms()
    res.json(result)
  } catch (e) {
    console.log('glossaryHandler::getTerms error')
    console.log(e)
    res.json({ error: e.message })
  }
}

exports.getTerm = async (req, res) => {
  try {
    const result = await glossaryDb.queryTerm(req.params.term)
    res.json(result)
  } catch (e) {
    console.log('glossaryHandler::getTerm error')
    console.log(e)
    res.json({ error: e.message })
  }
}

exports.deleteTerm = async (req, res) => {
  try {
    await glossaryDb.deleteTerm(req.params.term)
    res.json({ success: true })
  } catch (e) {
    console.log('glossaryHandler::deleteTerm error')
    console.log(e)
    res.json({ error: e.message })
  }
}

exports.addTerm = async (req, res) => {
  try {
    await glossaryDb.addTerm(req.body.term, req.body.meaning)
    res.json({ success: true })
  } catch (e) {
    console.log('glossaryHandler::addTerm error')
    console.log(e)
    res.json({ error: e.message })
  }
}

exports.updateTerm = async (req, res) => {
  try {
    await glossaryDb.updateTerm(req.params.term, req.body.term, req.body.meaning)
    res.json({ success: true })
  } catch (e) {
    console.log('glossaryHandler::updateTerm error')
    console.log(e)
    res.json({ error: e.message })
  }
}
