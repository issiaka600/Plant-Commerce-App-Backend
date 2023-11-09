const mongoose = require('mongoose')
const configs = require('../configs/config')
const dbURI = configs.mongo_DB_URI

const mongoDB = ()=>{
    return mongoose.connect(dbURI)
}
module.exports = mongoDB
