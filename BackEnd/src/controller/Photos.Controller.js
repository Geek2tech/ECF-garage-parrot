const uploadFile = require("../middleware/upload")
const fs = require("fs")
const logger = require('../services/Logger')
const database = require('../services/db')
const paginatedSelectQuery = require('../helpers/paginatedSelectQuery')
const {suppressSpecialChar} = require("../helpers/fieldControl");

const getPhotos = function (req, res) {
    try {
        const car_id = parseInt(req.params.car_id, 10)

        if (isNaN(car_id)) {
            return res.status(400).send('Invalid car ID')
        }

        const query = `SELECT * FROM photos WHERE car_id = ? AND primary_photo = "N"`
        logger.log({
            level: 'info',
            module: 'Photos',
            message: 'Call getPhotos'
        })
        paginatedSelectQuery(req, res, query, [car_id])

    } catch (err) {
        logger.log({
            level: 'error',
            module: 'Photos',
            message: `Internal error: ${err}`
        })

        return res.status(500).send('Internal Error')
    }




}
const addPhoto = async (req, res) => {
    try {

        await uploadFile(req, res);

        if (req.file == undefined) {

            logger.log({
                level: "error",
                module: 'File',
                message: `No file to upload`
            })

            return res.status(400).send({message: "Please upload a file!"})
        }
        logger.log({
            level: 'info',
            module: 'File',
            message: `Uploaded the file successfully : `
        })
        res.status(200).send({

            message: `Uploaded the file successfully:  `,
        });
    } catch (err) {
        logger.log({
            level: 'error',
            module: 'File',
            message: `Could not upload the file : ${err}`
        })

        res.status(500).send({
            message: `Could not upload the file:  ${err}`,
        })
    }
}


const downloadPhoto = (req, res) => {
    const fileName = req.params.name

    // Prevent path traversal attacks
    if (!fileName || fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
        logger.log({
            level: 'warn',
            module: 'Photo',
            message: `Path traversal attempt blocked: ${fileName}`
        })
        return res.status(400).send({ message: "Invalid file name" })
    }

    // Validate filename format (should be: nanoid_carId.extension)
    const validFilePattern = /^[a-z0-9]+_\d+\.(jpg|jpeg|png|gif|webp)$/i
    if (!validFilePattern.test(fileName)) {
        return res.status(400).send({ message: "Invalid file name format" })
    }

    const directoryPath = __basedir + "/Resources/Photos/"
    const path = require('path')
    const fullPath = path.join(directoryPath, fileName)

    // Ensure the resolved path is within the photos directory
    if (!fullPath.startsWith(path.resolve(directoryPath))) {
        return res.status(400).send({ message: "Invalid file path" })
    }

    logger.log({
        level: 'info',
        module: 'Photo',
        message: `Download file: ${fileName}`
    })

    res.download(fullPath, fileName, (err) => {
        if (err) {
            res.status(404).send({
                message: "File not found",
            })
        }
    })
}

const deletePhotos = (req, res) => {

    try {


        const photos_directory = __basedir + "/Resources/Photos/"

        fs.readdirSync(photos_directory).forEach(photo_file => {


                const car_id = photo_file.slice(photo_file.indexOf('_') + 1, photo_file.indexOf('.'))

                if (car_id === req.params.car_id) {
                    fs.unlink(photos_directory + photo_file, (err) => {
                        if (err) {
                            logger.log({
                                level: 'error',
                                module: 'Photos',
                                message: `Suppression de ${photos_directory}${photo_file} impossible`
                            })
                        }

                    })
                }

            }
        )
        logger.log({
            level: 'info',
            module: 'Photos',
            message: 'Bdd request'
        })
        const query = 'DELETE FROM photos WHERE car_id = ?'
        database.dbconnect.query(query,[req.params.car_id],(err)=> {

            if (err) {
                logger.log({
                    level:'error',
                    module:'Photos',
                    message:`SQl Error : ${err.message}`
                })
                return res.status(500).send('Database error')
            }



            logger.log({
                level:'info',
                module:'Photos',
                message:`Delete successfully `
            })

            //return res.status(200).send(`Suppression ok `)


        })




    } catch (err) {
        logger.log({
            level: 'error',
            module: 'Photos',
            message: `Internal error : ${err}`
        })
    }


}



module.exports = {
    getPhotos,
    addPhoto,
    downloadPhoto,
    deletePhotos
}
