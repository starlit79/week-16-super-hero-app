const Sequelize = require('sequelize')
const allConfigs = require('../config/sequelize')
const heroesModel = require('./heroes')

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect
})

const heroes = heroesModel(connection, Sequelize)

module.exports = { heroes }
