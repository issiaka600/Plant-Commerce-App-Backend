const express = require('express')
const app = express()
const cors = require('cors')
const plantRouter = require('./routes/plant.route')
const configs = require('./configs/config')

app.use(cors(configs.corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/plants',plantRouter)

const PORT = configs.PORT
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
})