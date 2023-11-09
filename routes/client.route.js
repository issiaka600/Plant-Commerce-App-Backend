const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.mongo.controller');

// Route pour l'inscription d'un nouvel utilisateur
router.post('/signup', clientController.createUser);
router.post('/signin', clientController.authenticateUser);


module.exports = router;
