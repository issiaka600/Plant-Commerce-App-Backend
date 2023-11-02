const { Sequelize } = require("sequelize");
const sequelize = require("../db/sequelize");

const Plant = sequelize.define('Plant',{
    id:{type:Sequelize.INTEGER,autoIncrement:true,primaryKey:true},
    cover:{type:Sequelize.STRING},
    name:{type:Sequelize.STRING(255),allowNull:false},
    category: {type :Sequelize.STRING},
    light : {type:Sequelize.INTEGER},
    water : {type:Sequelize.INTEGER},
    price: {type:Sequelize.INTEGER}
})

// Plant.sync({force:true})

module.exports = Plant