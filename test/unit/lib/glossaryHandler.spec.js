const expect = require('chai').expect
const sinon = require('sinon')
const handler = require('../../../src/lib/handlers/glossaryHandler')
const glossaryDb = require('../../../src/lib/database/glossaryDatabase')
const Response = require('../../mocks/response')
const Request = require('../../mocks/request')

const sandbox = sinon.createSandbox()

describe('glossaryHandler', () => {
  let mockReq, mockResp
  let getTermsStub, getTermStub, deleteTermStub, addTermStub, updateTermStub

  beforeEach(() => {
    mockReq = new Request()
    mockResp = new Response()
    const terms = [{ term: 'test', meaning: 'meaning of test' }]
    const getAllTermsResult = new Promise( r => r(terms))
    const oneTermResult = new Promise( r => r(terms[0]))
    getTermsStub = sandbox.stub(glossaryDb, 'getAllTerms').returns(getAllTermsResult)
    getTermStub = sandbox.stub(glossaryDb, 'queryTerm').returns(getAllTermsResult)
    deleteTermStub = sandbox.stub(glossaryDb, 'deleteTerm').returns(true)
    addTermStub = sandbox.stub(glossaryDb, 'addTerm').returns(oneTermResult)
    updateTermStub = sandbox.stub(glossaryDb, 'updateTerm').returns(oneTermResult)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#getTerms', () => {
    it('returns 200 and data when success', async () => {
      await handler.getTerms(mockReq, mockResp)
      expect(getTermsStub.calledOnce).to.be.true
      expect(mockResp.statusCode).to.equal(200)
      expect(mockResp.jsonBody).to.deep.equal({
        data: [{ term: 'test', meaning: 'meaning of test' }]
      })
    })

    it('returns 500 and error when error encountered', async () => {
      getTermsStub.throws(new Error('test error'))
      await handler.getTerms(mockReq, mockResp)
      expect(mockResp.statusCode).to.equal(500)
      expect(mockResp.jsonBody).to.deep.equal({ errors: [{ title: 'test error' }] })
    })
  })

  describe('#getTerm', () => {
    it('returns 200 and data when term found', async () => {
      await handler.getTerm(mockReq, mockResp)
      expect(getTermStub.calledOnce).to.be.true
      expect(mockResp.statusCode).to.equal(200)
      expect(mockResp.jsonBody).to.deep.equal({
        data: [{ term: 'test', meaning: 'meaning of test' }]
      })
    })

    it('returns 404 and empty data when term not found', async () => {
      getTermStub.returns([])
      await handler.getTerm(mockReq, mockResp)
      expect(mockResp.statusCode).to.equal(404)
      expect(mockResp.jsonBody).to.deep.equal({ data: [] })
    })

    it('returns 500 and and errors when error occurred', async () => {
      getTermStub.throws(new Error('test error'))
      await handler.getTerm(mockReq, mockResp)
      expect(mockResp.statusCode).to.equal(500)
      expect(mockResp.jsonBody).to.deep.equal({ errors: [{ title: 'test error' }] })
    })
  })

  describe('#deleteTerm', () => {
    it('returns 200 and meta success when deleted', async () => {
      await handler.deleteTerm(mockReq, mockResp)
      expect(deleteTermStub.calledOnce).to.be.true
      expect(mockResp.statusCode).to.equal(200)
      expect(mockResp.jsonBody).to.deep.equal({
        meta: { success: true }
      })
    })

    it('returns 404 and meta success false and errors when term not found', async () => {
      deleteTermStub.returns(false)
      await handler.deleteTerm(mockReq, mockResp)
      expect(mockResp.statusCode).to.equal(404)
      expect(mockResp.jsonBody).to.deep.equal({
        meta: { success: false },
        errors: [{ title: 'term not found' }]
      })
    })

    it('returns 500 and and errors when error occurred', async () => {
      deleteTermStub.throws(new Error('test error'))
      await handler.deleteTerm(mockReq, mockResp)
      expect(mockResp.statusCode).to.equal(500)
      expect(mockResp.jsonBody).to.deep.equal({ errors: [{ title: 'test error' }] })
    })
  })

  describe('#addTerm', () => {
    it('returns 200 and data when term successfully created', async () => {
      await handler.addTerm(mockReq, mockResp)
      expect(addTermStub.calledOnce).to.be.true
      expect(mockResp.statusCode).to.equal(200)
      expect(mockResp.jsonBody).to.deep.equal({
        data: { term: 'test', meaning: 'meaning of test' }
      })
    })

    it('returns 409 and error when term already exist', async () => {
      addTermStub.returns(null)
      await handler.addTerm(mockReq, mockResp)
      expect(mockResp.statusCode).to.equal(409)
      expect(mockResp.jsonBody).to.deep.equal({
        errors: [{ title: 'term already exist' }]
      })
    })

    it('returns 500 and and errors when error occurred', async () => {
      addTermStub.throws(new Error('test error'))
      await handler.addTerm(mockReq, mockResp)
      expect(mockResp.statusCode).to.equal(500)
      expect(mockResp.jsonBody).to.deep.equal({ errors: [{ title: 'test error' }] })
    })
  })

  describe('#updateTerm', () => {
    it('returns 200 and data when term successfully updated', async () => {
      await handler.updateTerm(mockReq, mockResp)
      expect(updateTermStub.calledOnce).to.be.true
      expect(mockResp.statusCode).to.equal(200)
      expect(mockResp.jsonBody).to.deep.equal({
        data: { term: 'test', meaning: 'meaning of test' }
      })
    })

    it('returns 404 and error when term does not exist', async () => {
      updateTermStub.returns(null)
      await handler.updateTerm(mockReq, mockResp)
      expect(mockResp.statusCode).to.equal(404)
      expect(mockResp.jsonBody).to.deep.equal({
        errors: [{ title: 'term not found' }]
      })
    })

    it('returns 500 and and errors when error occurred', async () => {
      updateTermStub.throws(new Error('test error'))
      await handler.updateTerm(mockReq, mockResp)
      expect(mockResp.statusCode).to.equal(500)
      expect(mockResp.jsonBody).to.deep.equal({ errors: [{ title: 'test error' }] })
    })
  })
})
