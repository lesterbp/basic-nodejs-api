let termList = require('../data/termList')

exports.getAllTerms = () => {
  return new Promise((resolve) => {
    // simulate a delay like querying a DB
    setTimeout(() => { resolve(termList) }, 1000)
  })
}

exports.queryTerm = (term) => {
  const result = termList.filter((v) => {
    return (v.term.toLowerCase() === term.toLowerCase())
  })
  return new Promise((resolve) => {
    // simulate a delay like querying a DB
    setTimeout(() => { resolve(result) }, 1000)
  })
}

exports.addTerm = (term, meaning) => {
  if (!term || !meaning) {
    throw new Error('term or meaning cannot be blank')
  }
  const existingTerm = termList.filter((v) => {
    return (v.term.toLowerCase() === term.toLowerCase())
  })
  if (existingTerm.length > 0) {
    return null
  }
  const result = { term, meaning }
  termList.push(result)
  return result
}

exports.deleteTerm = (term) => {
  const existingTerm = termList.filter((v) => {
    return (v.term.toLowerCase() === term.toLowerCase())
  })
  if (existingTerm.length < 1) {
    return false
  }
  const newList = termList.filter((v) => {
    return !(v.term.toLowerCase() === term.toLowerCase())
  })
  termList.length = 0
  newList.forEach(v => termList.push(v))
  return true
}

exports.updateTerm = (term, newTerm, newMeaning) => {
  const existingTerm = termList.filter((v) => {
    return (v.term.toLowerCase() === term.toLowerCase())
  })
  if (existingTerm.length < 1) {
    return null
  }
  if (newTerm) {
    existingTerm[0].term = newTerm
  }
  if (newMeaning) {
    existingTerm[0].meaning = newMeaning
  }
  return existingTerm[0]
}
