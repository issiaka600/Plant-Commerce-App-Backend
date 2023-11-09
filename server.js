const express = require('express')
const app = express()
const cors = require('cors')
const plantRouter = require('./routes/plant.route')
const categoryRouter = require('./routes/category.route')
const configs = require('./configs/config')
// const sequelize = require('./db/sequelize')
const mongoDB = require('./db/mongo')

app.use(cors(configs.corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/plants', plantRouter)
app.use('/categories',categoryRouter)

const PORT = configs.PORT
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection to the database has been established successfully.');

//     app.listen(PORT, () => {
//       console.log(`Server is listening on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });

mongoDB()
    .then(() => {
        console.log('Connection to the MongoDB database has been established successfully.');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    }).catch(error => console.error(error))