let termList = [
  { term: 'kb', meaning: 'Kilobyte' },
  { term: 'kbps', meaning: 'Kilobytes per second' },
  { term: 'mb', meaning: 'Megabyte' },
  { term: 'mbps', meaning: 'Megabytes per second' },
]

exports.getAllTerms = () => {
  return new Promise((resolve) => {
    // simulate a delay like querying a DB
    setTimeout(() => { resolve(termList) }, 2000)
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
    throw new Error('term already exist')
  }
  termList.push({ term, meaning })
}

exports.deleteTerm = (term) => {
  termList = termList.filter((v) => {
    return !(v.term.toLowerCase() === term.toLowerCase())
  })
}

exports.updateTerm = (term, newTerm, newMeaning) => {
  const existingTerm = termList.filter((v) => {
    return (v.term.toLowerCase() === term.toLowerCase())
  })
  if (existingTerm.length < 1) {
    throw new Error('term does not exist')
  }
  if (newTerm) {
    existingTerm[0].term = newTerm
  }
  if (newMeaning) {
    existingTerm[0].meaning = newMeaning
  }
}
