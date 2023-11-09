const express = require('express');
const router = express.Router();
const commandController = require('../controllers/Command.controller');

// Route pour l'inscription d'un nouvel utilisateur
router.post('/create', commandController.addCommand);

module.exports = router;
