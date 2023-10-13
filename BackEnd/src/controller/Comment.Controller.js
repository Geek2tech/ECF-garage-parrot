const logger = require('../services/Logger')
const paginatedSelectQuery = require('../helpers/paginatedSelectQuery')

async function getValidatedComment(req, res) {
    const table = 'comments'
    query = `SELECT *
             FROM ${table}
             WHERE STATUS = 1`
    paginatedSelectQuery(req,res,table,query)
}

async function getUnvalidatedComment(req, res) {

}

async function addComment(req, res) {

}

async function deleteComment(req, res) {

}

module.exports = {
    getUnvalidatedComment,
    getValidatedComment,
    addComment,
    deleteComment
}