const { default: mongoose } = require("mongoose")


const PlantSchema = new mongoose.Schema({
    cover:{type:String},
    name:{type:String},
    category : {type:mongoose.Schema.Types.ObjectId,ref:"category"},
    light : {type:mongoose.Schema.Types.Number},
    water :{type:mongoose.Schema.Types.Number} ,
    price: {type:mongoose.Schema.Types.Number}
})

module.exports = mongoose.model("plants",PlantSchema)