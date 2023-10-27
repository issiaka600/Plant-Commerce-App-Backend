const { Sequelize } = require("sequelize");

const configs = require('../configs/config')

const sequelize = new Sequelize(configs.database,configs.username,configs.password,{
    host:configs.host,
    dialect:configs.dbType,
    pool:configs.dbPool
})

module.exports = sequelize