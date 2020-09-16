const models = require('../models')

const getAllHeroes = async (request, response) => {
  const heroes = await models.heroes.findAll()

  return response.send(heroes)
}

const getHeroBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    const foundHero = await models.heroes.findOne({ where: { slug } })

    return foundHero
      ? response.send(foundHero)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to retrieve hero, please try again')
  }
}

const saveNewHero = async (request, response) => {
  const { name, realname, firstappearance, slug } = request.body

  if (!name || !realname || !firstappearance || !slug) {
    return request.status(400).send('The following fields are required: name, realname, firstappearance, slug')
  }

  const newHero = await models.heroes.create({ name, realname, firstappearance, slug })

  return response.status(201).send(newHero)
}

module.exports = { getAllHeroes, getHeroBySlug, saveNewHero }
