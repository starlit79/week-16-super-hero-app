/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  afterEach, before, beforeEach, describe, it
} = require('mocha')
const { heroesList, singleHero } = require('../mocks/heroes')
const { getAllHeroes, getHeroBySlug, saveNewHero } = require('../../controllers/heroes')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - heroes', () => {
  let sandbox
  let stubbedFindOne
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusSend
  let stubbedStatus

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindOne = sandbox.stub(models.heroes, 'findOne')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  describe('getAllHeroes', () => {
    it('retrieves a list of heroes from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.heroes, 'findAll').returns(heroesList)

      await getAllHeroes({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(heroesList)
    })
  })

  describe('getHeroBySlug', () => {
    it('retrieves the hero associated with the provided slug from the database and calls response.send with it', async () => {
      stubbedFindOne.returns(singleHero)
      const request = { params: { slug: 'iron-man' } }

      await getHeroBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'iron-man' } })
      expect(stubbedSend).to.have.been.calledWith(singleHero)
    })

    it('returns a 404 when no hero is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'not-found' } }

      await getHeroBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not-found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 with an error message when the database call throws an error', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { slug: 'throw-error' } }

      await getHeroBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'throw-error' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve hero, please try again')
    })
  })

  describe('saveNewHero', () => {
    it('accepts new hero details and saves them as a new hero, returning the saved record with a 201 status', async () => {
      const request = { body: singleHero }
      const stubbedCreate = sinon.stub(models.heroes, 'create').returns(singleHero)

      await saveNewHero(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleHero)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusSend).to.have.been.calledWith(singleHero)
    })
  })
})
