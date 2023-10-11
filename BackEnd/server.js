require("dotenv").config()
const express  = require("express")
const app = express()
const bodyParser= require("body-parser")
const helmet = require("helmet")
const cors = require("cors")
const initRoutes =require("./src/routes")
const logger = require('./src/services/Logger')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(helmet())
const corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors())
//app.use(express.urlencoded({extended:true}))
global.__basedir = __dirname


initRoutes(app)

let port = process.env.APP_PORT

app.listen(port, () => {
    logger.log({
        level:'info',
        module :'App',
        message:`Server started on port : ${port}`
    })


})

