const logger = require('../services/Logger')
const database = require('../services/db')
const paginatedSelectQuery = require('../helpers/paginatedSelectQuery')
const {suppressSpecialChar} = require("../helpers/fieldControl")
const photoController = require('../controller/Photos.Controller')


async function getCars(req, res) {
    try {

        logger.log({
            level: 'info',
            module: 'Cars',
            message: 'Call getCars'
        })
        const carId = suppressSpecialChar(req.body.car_id)
        console.log(carId)
console.log(req.body.priceFilter)
        console.log(req.body.circulationYearFilter)
        console.log(req.body.mileageFilter)

        let query
        if (carId === "all") {

            //const priceFilter = suppressSpecialChar(req.body.priceFilter)
            //const circulationYearFilter = suppressSpecialChar(req.body.circulationYearFilter)
            //const mileageFilter = suppressSpecialChar(req.body.mileageFilter)

            const priceFilter = req.body.priceFilter
            const circulationYearFilter = req.body.circulationYearFilter
            const mileageFilter = req.body.mileageFilter

            query = `SELECT c.* , p.photo_name FROM car_view AS c JOIN photos AS p ON c.car_id = p.car_id WHERE circulation_year >=  ${circulationYearFilter}  and price <=  ${priceFilter} and mileage <=  ${mileageFilter} and p.primary_photo = "Y"`

        } else {

            query = `SELECT c.*, p.photo_name FROM car_view as c JOIN photos AS p ON c.car_id = p.car_id  WHERE c.car_id = ${carId} and p.primary_photo = "Y"`

        }

        paginatedSelectQuery(req, res, query)
    } catch (err) {

        logger.log({
            level: 'error',
            module: 'Cars',
            message: `Internal error ${err}`
        })

    }


}

async function addCar(req, res) {

    const car = {
        price: suppressSpecialChar(req.body.price),
        circulation_year: (req.body.circulation_year),
        mileage: suppressSpecialChar(req.body.mileage),
        horse_power: suppressSpecialChar(req.body.horse_power),
        fiscal_power: suppressSpecialChar(req.body.fiscal_power),
        doors: suppressSpecialChar(req.body.doors),
        cylinder_capacity: suppressSpecialChar(req.body.cylinder_capacity),
        motor_type: suppressSpecialChar(req.body.motor_type),
        model_name: suppressSpecialChar(req.body.model_name),
        color: suppressSpecialChar(req.body.color),
        fuel_id: suppressSpecialChar(req.body.fuel_id),
        towing_id: suppressSpecialChar(req.body.towing_id),
        transmission_id: suppressSpecialChar(req.body.transmission_id),
        constructor_id: suppressSpecialChar(req.body.constructor_id)
    }

    logger.log({
        level: 'info',
        module: 'Cars',
        message: `Call addCar }`
    })
    const query = `INSERT INTO cars (price, circulation_year, mileage, horse_power, fiscal_power, doors,
                                     cylinder_capacity, motor_type,
                                     model_name, color, fuel_id, towing_id, transmission_type_id, constructor_id)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    logger.log({
            level: 'info',
            module: 'Cars',
            message: 'Bdd Request'
        }
    )

    database.dbconnect.query(query, [
        car.price,
        car.circulation_year,
        car.mileage,
        car.horse_power,
        car.fiscal_power,
        car.doors,
        car.cylinder_capacity,
        car.motor_type,
        car.model_name,
        car.color,
        car.fuel_id,
        car.towing_id,
        car.transmission_id,
        car.constructor_id
    ], (err, result) => {

        if (err) {
            logger.log({
                level: 'error',
                module: 'Cars',
                message: `Sql Error : ${err.message}`
            })
            return res.status(500).send(`Sql error : ${err.message}`)
        }

        logger.log({
            level: 'info',
            module: 'Cars',
            message: `Insert successfully with id : ${result.insertId}`
        })

        return res.status(200).send(`Ajout ok id : ${result.insertId}`)


    })
}


async function deleteCar(req, res) {

    const car_id = suppressSpecialChar(req.params.car_id)

    logger.log({
        level: 'info',
        module: 'Cars',
        message: `Call deleteCar with params ${car_id}`
    })

    // Suppress the car-equipement relation

    logger.log({
        level: 'info',
        module: 'Cars',
        message: 'Bdd resquest to suppress the car-equipements '
    })

    let query = `DELETE
                 FROM cars_equipements
                 WHERE car_id = ?`

    database.dbconnect.query(query, [car_id], (err) => {
        if (err) {
            logger.log({
                level: 'error',
                module: 'Cars',
                message: `Sql Error : ${err.sqlMessage}`
            })
            return res.status(500).send(`Sql error : ${err.sqlMessage}`)
        }

        logger.log({
            level: 'info',
            module: 'Cars',
            message: `Suppress photo for the car id ${car_id}`
        })
        // Suppress the photo file and bdd records

        photoController.deletePhotos(req, res)
        // Suppress the car

        logger.log({
            level: 'info',
            module: 'Cars',
            message: 'Bdd request for suppress car'
        })

        query = " DELETE FROM cars WHERE car_id = ?"
        database.dbconnect.query(query, [car_id], (err, result) => {
            if (err) {
                logger.log({
                    level: 'error',
                    module: 'Cars',
                    message: `Sql error : ${err.sqlMessage}`
                })
                return res.status(500).send(`Sql error ${err.sqlMessage}`)
            }
            logger.log({
                level: 'info',
                module: 'Cars',
                message: `Suppress car ${car_id} successfully`
            })
            return res.status(200).send('Suppression ok')
        })

    })

}

async function getMinMax(req, res) {

    const query = 'SELECT MIN(price) as min_price ,MAX(price) as max_price ,' +
        ' MIN(circulation_year) as min_year , ' +
        'MAX(circulation_year) as max_year , ' +
        'MIN(mileage) as min_mileage,MAX(mileage) as max_mileage from car_view'
    logger.log({
        level: 'info',
        module: 'Cars',
        message: `Call getMaxMileage`
    })

    paginatedSelectQuery(req, res, query)

}

module.exports = {
    getCars,
    addCar,
    deleteCar,
    getMinMax,


}