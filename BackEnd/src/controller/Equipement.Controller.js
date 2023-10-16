const logger = require('../services/Logger')
const paginatedSelectQuery = require('../helpers/paginatedSelectQuery')
const {suppressSpecialChar} = require("../helpers/fieldControl");
const database = require("../services/db");

/**
 * @function
 * @description Get list of equipement
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function getEquipements(req, res) {

    try {
        logger.log({
            level: 'info',
            module: 'Equipements',
            message: 'Call getEquipements'
        })

        const query = 'SELECT * FROM equipements'
        paginatedSelectQuery(req, res, query)

    }catch (err) {
        logger.log({
            level:'error',
            module:'Equipement',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }




}

/**
 * @function
 * @description Add an equipement
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function addEquipement(req, res) {

    try {
        const equipement_name = suppressSpecialChar(req.body.equipement_name)

        logger.log({
            level: 'info',
            module: 'Equipements',
            message: `Call addEquipement with params : ${equipement_name}`
        })



        const query = 'INSERT INTO equipements (equipement_name) VALUES ( ? )'

        logger.log({
            level:'info',
            module:"Equipements",
            message:'BDD Request'
        })

        await database.dbconnect.query(query,[equipement_name],(err,result)=> {
            if(err) {
                logger.log({
                    level:'error',
                    module:'Equipements',
                    message:`SQL Error : ${err}`
                })
                res.status(500)
                res.send(`SQL Error : ${err}`)
            }

            logger.log({
                level:'info',
                module:'Equipements',
                message:`Insert successfully :  id : ${result.insertId}`
            })
            res.status(201)
            res.send(`id : ${result.insertId}`)

        })


    }catch (err) {
        logger.log({
            level:'error',
            module:'Equipement',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }


}

/**
 * @function
 * @description Update an equipement
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function updateEquipement(req, res) {

    try {
        const equipement_name = suppressSpecialChar(req.body.equipement_name)
        const newValue = suppressSpecialChar(req.body.newValue)

        logger.log({
            level:'info',
            module:'Equipements',
            message:`Call updateEquipement with params : ${equipement_name} , ${newValue}`
        })

        const query = "UPDATE equipements SET equipement_name = ? WHERE equipement_name = ?"

        logger.log({
            level:'info',
            module:'Equipements',
            message:'BDD Request'
        })

        await database.dbconnect.query(query,[newValue , equipement_name],(err,result)=>{
            if(err) {
                logger.log({
                    level:'error',
                    module:'Equipements',
                    message:`update error : ${err}`
                })
                res.status(500)
                res.send(`update error ${err}`)
            } else {

                if(result.affectedRows === 0) {

                    logger.log({
                        level:'info',
                        module:'Equipements',
                        message:'Nothing to update'
                    })
                    res.status(204)
                    res.send('Nothing to update')
                }else {
                    logger.log({
                        level:'info',
                        module:'Equipements',
                        message:`Update successfully : ${result.message}`
                    })
                    res.status(200)
                    res.send('Update ok')

                }

            }

        })


    }catch (err) {
        logger.log({
            level:'error',
            module:'Equipement',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }


}


module.exports = {
    getEquipements,
    addEquipement,
    updateEquipement
}