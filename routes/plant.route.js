const express = require('express')

const router =express.Router()

// const plantController = require('../controllers/plant.controller')
const plantController = require('../controllers/plant.mongo.controller')

// router.get('/list',plantController.getAllPlants)
// router.get('/id/:id', plantController.getPlantById)
// router.post('/create',plantController.addPlant)
// router.post('/create/many',plantController.addManyPlants)
router.get('/list',plantController.getAllPlants)
router.get('/id/:id', plantController.getPlantById)
router.post('/create',plantController.addPlant)
router.post('/create/many',plantController.addManyPlants)

module.exports = router