const logger = require('../services/Logger')
const paginatedSelectQuery = require('../helpers/paginatedSelectQuery')
const {suppressSpecialChar} = require("../helpers/fieldControl");




/**
 * @function
 * @description get list of validated comment
 * @param req
 * @param res return the list of validated comment
 * @return {Promise<void>}
 */
async function getValidatedComment(req, res) {

    logger.log({
        level: 'info',
        module: 'Comments',
        message: 'Call getValidatedComment'
    })

    query = `SELECT *
             FROM comments
             WHERE STATUS = 1`
    paginatedSelectQuery(req, res, query)
}

/**
 * @function
 * @description get list of pending comment
 * @param req
 * @param res return the list of pending comment
 * @return {Promise<void>}
 */

async function getUnvalidatedComment(req, res) {

    logger.log({
        level: 'info',
        module: 'Comments',
        message: "Call getUnvalidatedComment"
    })

    query = `SELECT *
             FROM comments
             WHERE STATUS = 0`
    paginatedSelectQuery(req, res, query)

}


async function addComment(req, res) {


    const sender_name = suppressSpecialChar(req.body.sender_name)
    const comment_text = suppressSpecialChar(req.body.comment_text)
    const garage_note = suppressSpecialChar(req.body.garage_note)

    logger.log({
        level: 'info',
        module: 'Comments',
        message: `Call addComment with params : ${sender_name} , ${comment_text} , ${garage_note}`
    })
    const database = require('../services/db')

    const query = `INSERT INTO comments (sender_name, comment_text, garage_note, status)
                   VALUES (?, ?, ?, 0)`
    logger.log({
        level: 'info',
        module: 'Comments',
        message: `BDD Request`
    })
    await database.dbconnect.query(query,[sender_name,comment_text,garage_note],(err,result) => {
        if(err) {
            logger.log({
                level:'error',
                module:'Comments',
                message:`SQL Error : ${err}`
            })
            res.status(500)
            res.send(`SQL Error : ${err}`)
        }
        logger.log({
            level: 'info',
            module: 'Comments',
            message: `Insert successfully with id : ${result.insertId}`
        })
        res.status(201)
        res.send("ok : " + result.insertId)

    })


}

async function deleteComment(req, res) {

    const id = req.body.id

    logger.log({
        level:'info',
        module:'Comments',
        message:`Call delete comment with params : ${id}`
    })

    const database =require('../services/db')

    logger.log({
        level:'info',
        module:'Comments',
        message:`BDD Request`
    })

    const query = 'DELETE FROM comments WHERE comment_id = ?'
 await database.dbconnect.query(query,[id],(err,result) =>{
     if(err){
         logger.log({
             level:'error',
             module:'Comments',
             message:`SQL Error : ${err}`
         })
         res.status(500)
         res.send(`SQL error : ${err}`)
     }

     if (result.affectedRows === 0){
         logger.log({
             level:'info',
             module:'Comments',
             message:`Nothing to Delete`
     })
         res.status(204)
         res.send('Nothing to delete')
     }else {
         logger.log({
             level:'info',
             module:'Comments',
             message:`Delete successfully ${result.affectedRows}`
         })
         res.status(200)
         res.send(`Delete Ok : ${result.sqlMessage}`)
     }



 })
}

module.exports = {
    getUnvalidatedComment,
    getValidatedComment,
    addComment,
    deleteComment
}