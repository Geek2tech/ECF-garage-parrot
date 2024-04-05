const util = require("util")
const multer = require("multer")
const maxSize = 2 * 1024 * 1024
const {customAlphabet} = require('nanoid')
const database = require('../services/db')
const logger = require('../services/Logger')
const fs = require("fs")

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/Resources/Photos")
    },
    filename: (req, file, cb) => {
        const car_id = req.params.car_id
        const primary = req.params.primary

        const fileName = file.originalname.split(".")
        const nanoid = customAlphabet('1234567890abcdefghijklmnopqrst', 20)
        file.originalname = nanoid(20) + "_" + car_id + "." + fileName[1]
        const query = `INSERT INTO photos (photo_name,primary_photo,car_id)
                       VALUES (? , ?, ?)`
        try {

            database.dbconnect.query(query, [file.originalname,primary,car_id], (err, result) => {
                if (err) {
                    logger.log({
                        level: 'error',
                        module: 'File',
                        message: `Sql Error during insert : ${err}`
                    })
                    const fileToDelete = __basedir + "/Resources/Photos/" + file.originalname

                    fs.unlink(fileToDelete, (err) => {
                        logger.log({
                            level: 'error',
                            module: 'User',
                            message: `File Delete : ${fileToDelete}`
                        })
                    })
                    return err

                }
                logger.log({
                    level: 'info',
                    module: 'File',
                    message: `Insert new rows in BDD with filename  id : ${result.insertId}, trigger complete the car ID`
                })
            })
        } catch (err) {

        }


        cb(null, file.originalname)
    },
});


let uploadFile = multer({
    storage: storage,
    limits: {fileSize: maxSize},
}).single("file")


let uploadFileMiddleware = util.promisify(uploadFile)
module.exports = uploadFileMiddleware
