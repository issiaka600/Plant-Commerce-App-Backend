const plantList = require('../configs/plantList')
const Plant = require('../models/plant.model')



exports.getAllPlants = (req, res) => {
    console.log('lslfk')
    Plant.findAll()
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

    if (req.param.id) {
        res.status(200).json(plantList.find({ 'id': req.param.id }))
    }
}

exports.addPlant = (req, res) => {
    const element = req.body
    Plant.create(element)
        .then(plant => {
            console.log(`New plant info : ${plant}`)
            res.status(200).json(plant)
        })
        .catch(error => {
            console.log(`Error during adding new plant\n plant info : ${element}`)
        })
}

exports.addManyPlants = (req,res)=>{
    const list = req.body
    if(Array.isArray(list) && list.length>0){
        for (const plant of list) {
            Plant.create(plant)
        }
        res.status(200).json(Plant.findAll())
    }
}