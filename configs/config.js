module.exports = {
    database : 'plant-e-commerce-mern',
    username:'root',
    password:'',
    host :'localhost',
    dbType:'mysql',
    dbPool:{
        max:5,
        min:0,
        idle:10000
    },
    corsOptions : {origin:'http://localhost:3000'},
    PORT : 8080,
    mongo_DB_URI: "mongodb+srv://root:root@cluster0.hz3no5z.mongodb.net/plant_ecommerce_db?retryWrites=true&w=majority",
    JWT_SECRET:'b95875baef2c1118a8e3310820188a6b346115f5a680a00e3d434c123d2c6c89',
    JWT_TOKEN_LIFE_TME: '1d', // Durée de validité des tokens JWT (par exemple, 30 jours)
}