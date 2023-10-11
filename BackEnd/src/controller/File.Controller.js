const uploadFile = require("../middleware/upload")
const fs = require("fs")
const logger = require('../services/Logger')
const upload = async (req, res) => {
    try {
console.log("upload File")
        await uploadFile(req, res);

        if (req.file == undefined) {

            logger.log({
                level:"warning",
                module:'File',
                message:`No file to upload`
            })

            return res.status(400).send({ message: "Please upload a file!" })
        }
logger.log({
    level:'info',
    module:'File',
    message:'Uploaded the file successfully'
})
        res.status(200).send({

            message: "Uploaded the file successfully: ",
        });
    } catch (err) {
        logger.log({
            level:'error',
            module:'File',
            message:`Could not upload the file : ${err}`
        })

        res.status(500).send({
            message: `Could not upload the file:  ${err}`,
        })
    }
}



const download = (req, res) => {
    const fileName = req.params.name
    const directoryPath = __basedir + "/resources/Photos/"

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            })
        }
    })
}

const deleteFile = (req,res) =>{

    const fileToDelete = __basedir +"/Resources/Photos/" + req.params.name
    fs.unlink(fileToDelete,(err) =>{
        if (err) {
            res.status(500)
            res.send("Supression impossible : " + err)
        } else {
            res.status(200)
            res.send("ok")
        }
    })


}

module.exports = {
    upload,
    download,
    deleteFile
}
