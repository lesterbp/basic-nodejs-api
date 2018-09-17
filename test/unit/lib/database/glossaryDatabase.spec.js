const expect = require('chai').expect
const sinon = require('sinon')
const rewire = require('rewire')
const glossaryDb = rewire('../../../../src/lib/database/glossaryDatabase')

const sandbox = sinon.createSandbox()

describe('glossaryDatabase', () => {
  let termList
  beforeEach(() => {
    termList = [
      { term: 'test', meaning: 'meaning of test' },
      { term: 'test2', meaning: 'meaning of test2' }
    ]
    glossaryDb.__set__('termList', termList)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#getAllTerms', () => {
    it('returns all terms', async () => {
      const result = await glossaryDb.getAllTerms()
      expect(result).to.deep.equal([
        { term: 'test', meaning: 'meaning of test' },
        { term: 'test2', meaning: 'meaning of test2' }
      ])
    })
  })

  describe('#queryTerm', () => {
    it('returns correct term', async () => {
      const result = await glossaryDb.queryTerm('test2')
      expect(result).to.deep.equal([{ term: 'test2', meaning: 'meaning of test2' }])
    })

    it('returns empty when term not found', async () => {
      const result = await glossaryDb.queryTerm('test22')
      expect(result).to.be.empty
    })
  })

  describe('#addTerm', () => {
    it('adds the term and return it', async () => {
      const result = await glossaryDb.addTerm('test3', 'meaning3')
      expect(termList).to.have.lengthOf(3)
      expect(result).to.deep.equal({ term: 'test3', meaning: 'meaning3' })
    })

    it('returns null if term exists', async () => {
      const result = await glossaryDb.addTerm('test', 'meaning')
      expect(result).to.be.null
    })
  })

  describe('#deleteTerm', () => {
    it('deletes the term and returns true', async () => {
      const result = await glossaryDb.deleteTerm('test2')
      expect(termList).to.have.lengthOf(1)
      expect(result).to.be.true
    })

    it('returns false if term not found', async () => {
      const result = await glossaryDb.deleteTerm('test1111')
      expect(termList).to.have.lengthOf(2)
      expect(result).to.be.false
    })
  })

  describe('#updateTerm', () => {
    it('updates the term and returns it', async () => {
      const result = await glossaryDb.updateTerm('test2', 'test33', 'meaning33')
      expect(termList).to.have.lengthOf(2)
      expect(result).to.deep.equal({ term: 'test33', meaning: 'meaning33' })
    })

    it('updates the term meaning only and returns it', async () => {
      const result = await glossaryDb.updateTerm('test2', null, 'meaning33')
      expect(termList).to.have.lengthOf(2)
      expect(result).to.deep.equal({ term: 'test2', meaning: 'meaning33' })
    })

    it('updates the term name only and returns it', async () => {
      const result = await glossaryDb.updateTerm('test2', 'term3333')
      expect(termList).to.have.lengthOf(2)
      expect(result).to.deep.equal({ term: 'term3333', meaning: 'meaning of test2' })
    })

    it('returns null if term not found', async () => {
      const result = await glossaryDb.updateTerm('test1111', 'test33')
      expect(termList).to.have.lengthOf(2)
      expect(result).to.be.null
    })
  })
})
