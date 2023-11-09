const Command = require('../models/Command.mongo.model');
const Plant = require('../models/plant.mongo.model');
const Client = require('../models/Client.mongo.model');

exports.addCommand = async (req, res) => {
  try {
    const { userId, plants } = req.body;

    // Vérifier si l'utilisateur existe
    const userExists = await Client.findById(userId);
    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Vérifier si les plantes existent
    const plantIds = plants.map(plant => plant.plant);
    const plantsExist = await Plant.find({ _id: { $in: plantIds } });

    if (plantsExist.length !== plantIds.length) {
      return res.status(400).json({ error: 'One or more plants not found' });
    }

    // Créer la commande
    const order = new Command({ user: userId, plants });

    // Enregistrer la commande
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Command.find().populate('user', 'name').populate('plants.plant', 'name');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};