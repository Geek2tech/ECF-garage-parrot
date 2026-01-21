const util = require("util")
const multer = require("multer")
const maxSize = 2 * 1024 * 1024 // 2MB
const {customAlphabet} = require('nanoid')
const database = require('../services/db')
const logger = require('../services/Logger')
const fs = require("fs")
const path = require("path")

// Allowed MIME types for images
const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp'
]

// Allowed extensions
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

// File filter to validate MIME type and extension
const fileFilter = (req, file, cb) => {
    // Check MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        logger.log({
            level: 'warn',
            module: 'File',
            message: `Rejected file upload: invalid MIME type ${file.mimetype}`
        })
        return cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WebP are allowed.'), false)
    }

    // Check extension
    const ext = path.extname(file.originalname).toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        logger.log({
            level: 'warn',
            module: 'File',
            message: `Rejected file upload: invalid extension ${ext}`
        })
        return cb(new Error('Invalid file extension.'), false)
    }

    cb(null, true)
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/Resources/Photos")
    },
    filename: (req, file, cb) => {
        const car_id = req.params.car_id
        const primary = req.params.primary

        // Validate car_id is numeric
        if (!car_id || isNaN(parseInt(car_id, 10))) {
            return cb(new Error('Invalid car ID'), null)
        }

        // Get safe extension from original filename
        const ext = path.extname(file.originalname).toLowerCase()
        const nanoid = customAlphabet('1234567890abcdefghijklmnopqrst', 20)
        const newFilename = nanoid(20) + "_" + car_id + ext

        file.originalname = newFilename

        const query = `INSERT INTO photos (photo_name, primary_photo, car_id) VALUES (?, ?, ?)`

        try {
            database.dbconnect.query(query, [file.originalname, primary, car_id], (err, result) => {
                if (err) {
                    logger.log({
                        level: 'error',
                        module: 'File',
                        message: `SQL Error during insert: ${err.message}`
                    })
                    const fileToDelete = __basedir + "/Resources/Photos/" + file.originalname

                    fs.unlink(fileToDelete, (unlinkErr) => {
                        if (unlinkErr) {
                            logger.log({
                                level: 'error',
                                module: 'File',
                                message: `Failed to delete file: ${fileToDelete}`
                            })
                        }
                    })
                    return cb(err, null)
                }

                logger.log({
                    level: 'info',
                    module: 'File',
                    message: `Insert new row in DB with filename id: ${result.insertId}`
                })
            })
        } catch (err) {
            logger.log({
                level: 'error',
                module: 'File',
                message: `Error during file upload: ${err.message}`
            })
            return cb(err, null)
        }

        cb(null, file.originalname)
    },
})

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: fileFilter
}).single("file")


let uploadFileMiddleware = util.promisify(uploadFile)
module.exports = uploadFileMiddleware
