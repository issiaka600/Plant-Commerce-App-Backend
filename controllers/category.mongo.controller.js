const Category = require('../models/category.mongo.model')

exports.createCategory = async (req, res) => {
    const element = req.body
    if (!element || !element.name) {
        res.status(400).json({ error: 'Bad category to insert' })
    }
    const name = element.name
    const existingElement = await Category.findOne({ name })
    if (existingElement) {
        res.status(400).json({ error: 'This category already exist.' })
    }
    else{
        Category.create(element)
        .then(data => res.status(201).json(data))
        .catch(error => {
            res.status(500).json({ error: "Something wrong happened" })
            console.error(error)
        })
    }

}
exports.addManyCategories = (req, res) => {
    const elements = req.body
    if (Array.isArray(list) && list.length > 0) {
        Category.insertMany(elements)
            .then(data => {
                res.send(data)
            })
            .catch(error => {
                res.status(500).json({ Error: 'Something wrong happened during categorie collections insertions' })
                console.error(error)
            })
    }
}