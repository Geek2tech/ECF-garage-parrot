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
const allowedOrigins = [process.env.APP_AUTHORIZED_URL1,process.env.APP_AUTHORIZED_URL2]
const corsOptions = {
    origin: function(origin, callback){    // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);    if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }    return callback(null, true);
    },
credentials:true
}

app.use(cors(corsOptions))
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

