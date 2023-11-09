const categoryController = require('../controllers/category.mongo.controller')

const router = require('express').Router()

router.use('/create',categoryController.createCategory)
router.use('/create/many',categoryController.addManyCategories)

module.exports = router