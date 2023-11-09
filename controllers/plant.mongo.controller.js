const Plant = require('../models/plant.mongo.model')
const objectId = require('mongoose').Types.ObjectId

const exclueOptions = { path: "category", select: "-_id -__v" }

exports.getAllPlants = (req, res) => {
    Plant.find().populate(exclueOptions)
        .then(
            data => {
                res.status(200).json(data)
            }
        )
        .catch(error => {
            console.log('error : Something bad happened during listing plants')
        })
}

exports.getPlantById = (req, res) => {
    const plantId = req.params.id; // Utilisez "params" au lieu de "param"

    if (objectId.isValid(plantId)) {
        Plant.findById(plantId).populate(exclueOptions).select('-__v')
            .then(data => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    res.status(404).json({
                        error: "Plant not found"
                    });
                }
            })
            .catch(error => {
                console.log('error : Something bad happened during getting plant by ID');
                res.status(500).json({
                    error: "Internal server error"
                });
            });
    } else {
        res.status(400).json({
            error: "Invalid plant ID"
        });
    }
};

exports.addPlant = (req, res) => {
    const element = req.body
    if (Array.isArray(element)) {
        res.status(400).json({ error: 'One insert at a time with this request' })
    }
    else {
        Plant.create(element)
            .then(plant => {
                console.log(`New plant info : ${plant}`)
                res.status(200).json(plant)
            })
            .catch(error => {
                console.log(`Error during adding new plant\n plant info : ${element}`)
            })
    }

}

exports.addManyPlants = (req, res) => {
    const list = req.body
    if (Array.isArray(list) && list.length > 0) {
        Plant.insertMany(list)
            .then(data => { res.status(200).json(data) })
            .catch(erorr => {
                res.status(500).json({ error: 'Something wrong happened' })
            })
    }
}