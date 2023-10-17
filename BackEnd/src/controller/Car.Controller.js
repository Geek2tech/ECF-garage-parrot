const logger = require('../services/Logger')
const database = require('../services/db')
const paginatedSelectQuery = require('../helpers/paginatedSelectQuery')
const {suppressSpecialChar} = require("../helpers/fieldControl");
async function getCars (req,res) {

    logger.log({
        level:'info',
        module:'Cars',
        message:'Call getCars'
    })

    query = "SELECT * FROM car_view"

    paginatedSelectQuery(req,res,query)

}

async function addCar(req,res) {

    const car = {
        price:suppressSpecialChar(req.body.price),
        circulation_year:(req.body.circulation_year),
        mileage:suppressSpecialChar(req.body.mileage),
        horse_power:suppressSpecialChar(req.body.horse_power),
        fiscal_power:suppressSpecialChar(req.body.fiscal_power),
        doors:suppressSpecialChar(req.body.doors),
        cylinder_capacity:suppressSpecialChar(req.body.cylinder_capacity),
        motor_type:suppressSpecialChar(req.body.motor_type),
        model_name:suppressSpecialChar(req.body.model_name),
        color:suppressSpecialChar(req.body.color),
        fuel_id:suppressSpecialChar(req.body.fuel_id),
        towing_id:suppressSpecialChar(req.body.towing_id),
        transmission_id:suppressSpecialChar(req.body.transmission_id),
        constructor_id:suppressSpecialChar(req.body.constructor_id)
    }

logger.log({
    level:'info',
    module:'Cars',
    message:`Call addCar }`
})
    const query = `INSERT INTO cars (price, circulation_year, mileage, horse_power,fiscal_power, doors, cylinder_capacity, motor_type,
                               model_name, color, fuel_id, towing_id, transmission_type_id, constructor_id)
             VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?)`

    logger.log({
    level:'info',
        module:'Cars',
        message:'Bdd Request'
    }
)

database.dbconnect.query(query,[
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
],(err,result) => {

    if(err) {
        logger.log({
            level:'error',
            module:'Cars',
            message:`Sql Error : ${err.message}`
        })
        return res.status(500).send(`Sql error : ${err.message}`)
    }

    logger.log({
        level:'info',
        module:'Cars',
        message:`Insert successfully with id : ${result.insertId}`
    })

    return res.status(200).send(`Ajout ok id : ${result.insertId}`)


})}


async function deleteCar(req,res) {


}

async function updateCar(req,res) {

}

module.exports = {
    getCars,
    addCar,
    deleteCar,
    updateCar
}