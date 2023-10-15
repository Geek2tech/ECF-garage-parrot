const express = require("express");
const router = express.Router();
const fs = require('fs')
const checkApiKey = require('../middleware/checkApiKey')
const checkAuth = require('../middleware/checkAuth')
const logger = require('../services/Logger')


let routes = (app) => {

    app.all('/*', checkApiKey)
    app.all('*/protected/*', checkAuth)

    const routes_directory = require('path').resolve(__dirname) + "/routes/"

    fs.readdirSync(routes_directory).forEach(route_file => {

        logger.log({
            level: 'info',
            module: 'Routes',
            message: `Loading route file : ${route_file}`
        })
        try {
            app.use('/', require(routes_directory + route_file))
        } catch (error) {
            logger.log({
                level: 'error',
                module: 'Route',
                message: `Error during charging routes : ${error}`
            })
        }

    })


    app.use(router)
}


module.exports = routes
