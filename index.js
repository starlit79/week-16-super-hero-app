const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/sequelize')
const { getAllHeroes, getHeroBySlug, saveNewHero } = require('./controllers/heroes')

const app = express()

// handle "root" url endpoint
app.get('/', getAllHeroes)

// a demo-only or dev-only endpoint for debugging the app
// allows us to see env vars working
app.get('/debug-the-config', (request, response) => {
  response.send(config)
})

// handler filtering based on value sent in the url
app.get('/:slug', getHeroBySlug)

// add a new record to the database
app.post('/', bodyParser.json(), saveNewHero)


app.get('/debug-the-db', (request, response) => {
  response.send(connection.query(""))
})



app.listen(3009, () => {
  console.log('Listening on port 3009...') // eslint-disable-line no-console
})
