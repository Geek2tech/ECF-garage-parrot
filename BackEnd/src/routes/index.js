const express = require("express");
const router = express.Router();

const AuthController = require('../controller/Auth.controller')
const servicesController = require('../controller/Services.Controller')
const towingController = require('../controller/Towing.Controller')
const transmissionController = require('../controller/Transmission.Controller')
const checkApiKey = require('../middleware/checkApiKey')
const checkAuth = require('../middleware/checkAuth')

const testRoute = require('./test')
const constructorRoutes = require('./routes/contructorRoutes')
const mailRoutes = require('./routes/mailRoutes')
const fileRoutes = require('./routes/fileRoutes')
const fuelRoutes = require('./routes/fuelRoutes')
const profilRoutes = require('./routes/profilRoutes')
const openingHoursRoutes = require('./routes/openingHoursRoutes')
const authRoutes = require('./routes/authRoutes')
const servicesRoutes = require('./routes/servicesRoutes')
const towingRoutes = require('./routes/towingsRoutes')
const transmissionRoutes = require('./routes/transmissionRoutes')
let routes = (app) => {

    app.all('/*', checkApiKey)
    app.all('*/protected/*', checkAuth)

    app.use("/", testRoute)
    app.use('/', constructorRoutes)
    app.use('/', mailRoutes)
    app.use('/', fileRoutes)
    app.use('/', fuelRoutes)
    app.use('/', profilRoutes)
    app.use('/', openingHoursRoutes)
    app.use('/', authRoutes)
    app.use('/', servicesRoutes)
    app.use('/', towingRoutes)
    app.use('/',transmissionRoutes)



    app.use(router)
}


module.exports = routes
