const glossaryDb = require('../database/glossaryDatabase')
const WsAddTermEvent = require('../wsEvents/wsAddTermEvent')

exports.getTerms = async (req, res) => {
  try {
    const data = await glossaryDb.getAllTerms()
    res.json({ data })
  } catch (e) {
    console.log('glossaryHandler::getTerms error')
    console.log(e)
    res.status(500).json({ errors: [{ title: e.message }] })
  }
}

exports.getTerm = async (req, res) => {
  try {
    let data = await glossaryDb.queryTerm(req.params.term)
    if (data.length > 0) {
      res.json({ data })
    } else {
      res.status(404).json({ data: [] })
    }
  } catch (e) {
    console.log('glossaryHandler::getTerm error')
    console.log(e)
    res.status(500).json({ errors: [{ title: e.message }] })
  }
}

exports.deleteTerm = async (req, res) => {
  try {
    const success = await glossaryDb.deleteTerm(req.params.term)
    if (success) {
      res.json({ meta: { success } })
    } else {
      res.status(404).json({
        meta: { success },
        errors: [{ title: 'term not found' }]
      })
    }
  } catch (e) {
    console.log('glossaryHandler::deleteTerm error')
    console.log(e)
    res.status(500).json({ errors: [{ title: e.message }] })
  }
}

exports.addTerm = async (req, res) => {
  try {
    const data = await glossaryDb.addTerm(req.body.term, req.body.meaning)
    if (data === null) {
      res.status(409).json({ errors: [{ title: 'term already exist' }] })
    } else {
      new WsAddTermEvent(data).broadcast()
      res.json({ data })
    }
  } catch (e) {
    console.log('glossaryHandler::addTerm error')
    console.log(e)
    res.status(500).json({ errors: [{ title: e.message }] })
  }
}

exports.updateTerm = async (req, res) => {
  try {
    const data = await glossaryDb.updateTerm(req.params.term, req.body.term, req.body.meaning)
    if (data === null) {
      res.status(404).json({ errors: [{ title: 'term not found' }] })
    } else {
      res.json({ data })
    }
  } catch (e) {
    console.log('glossaryHandler::updateTerm error')
    console.log(e)
    res.status(500).json({ errors: [{ title: e.message }] })
  }
}
