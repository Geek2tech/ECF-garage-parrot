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

       // const query = 'SELECT * FROM equipements'
        const query = 'SELECT e.equipement_id , e.equipement_name , count(ec.car_id) as nombre from equipements as e left join cars_equipements as ec on e.equipement_id = ec.equipement_id group by e.equipement_name'

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
                if (err.code === 'ER_DUP_ENTRY') {
                    logger.log({
                        level: 'error',
                        module: 'Constructor',
                        message: `Duplicate Entry`
                    })
                    res.status(204)
                    res.send('Entré déja existant')
                    return
                }
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
        console.log(req.body)
        const equipement_id = suppressSpecialChar(req.body.equipement_id)
        const newValue = suppressSpecialChar(req.body.newValue)

        logger.log({
            level:'info',
            module:'Equipements',
            message:`Call updateEquipement with params : ${equipement_id} , ${newValue}`
        })

        const query = "UPDATE equipements SET equipement_name = ? WHERE equipement_id = ?"

        logger.log({
            level:'info',
            module:'Equipements',
            message:'BDD Request'
        })

        await database.dbconnect.query(query,[newValue , equipement_id],(err,result)=>{
            if(err) {
                logger.log({
                    level:'error',
                    module:'Equipements',
                    message:`update error : ${err}`
                })

                res.status(200)
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

async function deleteEquipement(req, res) {

        try {
            const equipement_id = suppressSpecialChar(req.body.equipement_id)

            logger.log({
                level:'info',
                module:'Equipements',
                message:`Call deleteEquipement with params : ${equipement_id}`
            })

            const query = "DELETE FROM equipements WHERE equipement_id = ?"

            logger.log({
                level:'info',
                module:'Equipements',
                message:'BDD Request'
            })

            await database.dbconnect.query(query,[equipement_id],(err,result)=>{
                if(err) {
                    logger.log({
                        level:'error',
                        module:'Equipements',
                        message:`delete error : ${err}`
                    })

                    res.status(200)
                    res.send(`delete error ${err}`)
                } else {

                    if(result.affectedRows === 0) {

                        logger.log({
                            level:'info',
                            module:'Equipements',
                            message:'Nothing to delete'
                        })
                        res.status(204)
                        res.send('Nothing to delete')
                    }else {
                        logger.log({
                            level:'info',
                            module:'Equipements',
                            message:`Delete successfully : ${result.message}`
                        })
                        res.status(200)
                        res.send('Delete ok')

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
    updateEquipement,
    deleteEquipement
}
