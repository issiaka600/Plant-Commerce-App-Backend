const { default: mongoose } = require("mongoose");


const CategorySchema = new mongoose.Schema({
    name:{type:String,unique:true,trim:true}
})

module.exports = mongoose.model("category",CategorySchema)