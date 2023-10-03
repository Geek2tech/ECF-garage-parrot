const express  = require("express")
const app = express()
const bodyParser= require("body-parser")
const helmet = require("helmet")
const cors = require("cors")
const initRoutes =require("./src/routes")


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(helmet())
const corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions))
//app.use(express.urlencoded({extended:true}))
global.__basedir = __dirname

initRoutes(app)

let port = 8080

app.listen(port, () => {
    console.log(`server running at localhost:${port}`)

})

