const Command = require('../models/Command.mongo.model');
const Plant = require('../models/plant.mongo.model');
const Client = require('../models/Client.mongo.model');

exports.addCommand = async (req, res) => {
  try {
    // Récupérer les données de la requête
    const { userId, plants } = req.body;

    // Vérifier si l'utilisateur existe
    const userExists = await Client.findById(userId);
    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Vérifier si les plantes existent
    const plantIds = plants.map((plant) => plant.id);
    const plantsExist = await Plant.find({ _id: { $in: plantIds } });

    // if (plantsExist.length !== plantIds.length) {
    //   return res.status(400).json({ error: 'One or more plants not found' });
    // }

    // Créer la structure de la commande
    const orderPlants = [];
    plants.forEach((plant) => {
      const existingPlantIndex = orderPlants.findIndex(
        (orderPlant) => orderPlant.plant === plant.id
      );

      if (existingPlantIndex !== -1) {
        // Si la plante existe déjà dans la commande, augmenter la quantité
        orderPlants[existingPlantIndex].quantity += 1;
      } else {
        // Sinon, ajouter la plante à la commande avec une quantité de 1
        orderPlants.push({ plant: plant.id, quantity: 1 });
      }
    });

    // Créer la commande
    const order = new Command({ client: userId, plants: orderPlants });

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
    const orders = await Command.find()
      .populate('client', 'name') // Correction : Utiliser 'client' au lieu de 'user'
      .populate('plants.plant', 'name');

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
