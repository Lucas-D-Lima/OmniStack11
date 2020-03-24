const express = require('express')

const OngController = require('./controllers/OngController')
const casesController = require('./controllers/casesController')
const profilleController = require('./controllers/profilleController')
const sessionController = require('./controllers/sessionController')


const route = express.Router()

route.get('/ongs', OngController.index)
route.post('/ongs', OngController.create)

route.get('/profile', profilleController.index)

route.post('/session', sessionController.create)

route.post('/cases', casesController.create)
route.get('/cases', casesController.index)
route.delete('/cases/:id', casesController.delete)

module.exports = route