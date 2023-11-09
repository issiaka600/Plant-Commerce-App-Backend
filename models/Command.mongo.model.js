const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients', // Référence au modèle de clients
    required: true,
  },
  plants: [
    {
      plant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plants', // Référence au modèle de plantes
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('commands', CommandSchema);