const professionalController = require("./controllers/professionalController")
const vaccineController = require("./controllers/VaccineController")
const citizenController = require("./controllers/CitizenController")
const routes = require("express").Router()


routes.post('/professional', professionalController.create)

routes.get('/professional', professionalController.show)

routes.post('/vaccine', vaccineController.create)
routes.get('/vaccine', vaccineController.show)

routes.post("/citizen", citizenController.create)
routes.get('/citizen', citizenController.show)
routes.get('/citizen-index', citizenController.index)
routes.put('/citizen', citizenController.application_vaccine)

module.exports = routes