const logger = require('../services/Logger')
const paginatedSelectQuery = require('../helpers/paginatedSelectQuery')
const {suppressSpecialChar} = require("../helpers/fieldControl")
const database = require("../services/db")

/**
 * @function
 * @description get list of validated comment
 * @param req
 * @param res return the list of validated comment
 * @return {Promise<void>}
 */
async function getValidatedComment(req, res) {
    try {
        logger.log({
            level: 'info',
            module: 'Comments',
            message: 'Call getValidatedComment'
        })

        const query = `SELECT * FROM comments WHERE status = 1`
        paginatedSelectQuery(req, res, query)
    } catch (err) {
        logger.log({
            level: 'error',
            module: 'Comment',
            message: `Internal error: ${err}`
        })

        return res.status(500).send('Internal Error')
    }
}

/**
 * @function
 * @description get list of pending comment
 * @param req
 * @param res return the list of pending comment
 * @return {Promise<void>}
 */
async function getUnvalidatedComment(req, res) {
    try {
        logger.log({
            level: 'info',
            module: 'Comments',
            message: "Call getUnvalidatedComment"
        })

        const query = `SELECT * FROM comments WHERE status = 0`
        paginatedSelectQuery(req, res, query)
    } catch (err) {
        logger.log({
            level: 'error',
            module: 'Comment',
            message: `Internal error: ${err}`
        })

        return res.status(500).send('Internal Error')
    }
}

/**
 * @function
 * @description add a comment
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function addComment(req, res) {
    try {
        const sender_name = suppressSpecialChar(req.body.sender_name)
        const comment_text = suppressSpecialChar(req.body.comment_text)
        const garage_note = suppressSpecialChar(req.body.garage_note)

        if (!sender_name || !comment_text || !garage_note) {
            return res.status(400).send('Missing required fields')
        }

        logger.log({
            level: 'info',
            module: 'Comments',
            message: 'Call addComment'
        })

        const query = `INSERT INTO comments (sender_name, comment_text, garage_note, status) VALUES (?, ?, ?, 0)`

        logger.log({
            level: 'info',
            module: 'Comments',
            message: 'BDD Request'
        })

        database.dbconnect.query(query, [sender_name, comment_text, garage_note], (err, result) => {
            if (err) {
                logger.log({
                    level: 'error',
                    module: 'Comments',
                    message: `SQL Error: ${err}`
                })
                return res.status(500).send('Database error')
            }

            logger.log({
                level: 'info',
                module: 'Comments',
                message: `Insert successfully with id: ${result.insertId}`
            })
            return res.status(201).send(`${result.insertId}`)
        })
    } catch (err) {
        logger.log({
            level: 'error',
            module: 'Comment',
            message: `Internal error: ${err}`
        })

        return res.status(500).send('Internal Error')
    }
}

/**
 * @function
 * @description delete a comment
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function deleteComment(req, res) {
    try {
        const id = parseInt(req.body.id, 10)

        if (isNaN(id)) {
            return res.status(400).send('Invalid comment ID')
        }

        logger.log({
            level: 'info',
            module: 'Comments',
            message: `Call delete comment with id: ${id}`
        })

        logger.log({
            level: 'info',
            module: 'Comments',
            message: 'BDD Request'
        })

        const query = 'DELETE FROM comments WHERE comment_id = ?'
        database.dbconnect.query(query, [id], (err, result) => {
            if (err) {
                logger.log({
                    level: 'error',
                    module: 'Comments',
                    message: `SQL Error: ${err}`
                })
                return res.status(500).send('Database error')
            }

            if (result.affectedRows === 0) {
                logger.log({
                    level: 'info',
                    module: 'Comments',
                    message: 'Nothing to delete'
                })
                return res.status(404).send('Comment not found')
            }

            logger.log({
                level: 'info',
                module: 'Comments',
                message: `Delete successfully ${result.affectedRows}`
            })
            return res.status(200).send('Delete Ok')
        })
    } catch (err) {
        logger.log({
            level: 'error',
            module: 'Comment',
            message: `Internal error: ${err}`
        })

        return res.status(500).send('Internal Error')
    }
}

/**
 * @function
 * @description validate a comment
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function validateComment(req, res) {
    try {
        const id = parseInt(req.body.id, 10)

        if (isNaN(id)) {
            return res.status(400).send('Invalid comment ID')
        }

        const query = 'UPDATE comments SET status = 1 WHERE comment_id = ?'
        database.dbconnect.query(query, [id], (err, result) => {
            if (err) {
                logger.log({
                    level: 'error',
                    module: 'Comments',
                    message: `SQL Error: ${err}`
                })
                return res.status(500).send('Database error')
            }

            if (result.affectedRows === 0) {
                logger.log({
                    level: 'info',
                    module: 'Comments',
                    message: 'Nothing to update'
                })
                return res.status(404).send('Comment not found')
            }

            logger.log({
                level: 'info',
                module: 'Comments',
                message: `Update successfully ${result.affectedRows}`
            })
            return res.status(200).send('Update Ok')
        })
    } catch (err) {
        logger.log({
            level: 'error',
            module: 'Comment',
            message: `Internal Error: ${err}`
        })
        return res.status(500).send('Internal error')
    }
}

module.exports = {
    getUnvalidatedComment,
    getValidatedComment,
    addComment,
    deleteComment,
    validateComment
}
