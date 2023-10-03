const uploadFile = require("../middleware/upload")
const fs = require("fs")
const upload = async (req, res) => {
    try {
console.log("upload File")
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" })
        }

        res.status(200).send({
            message: "Uploaded the file successfully: ",
        });
    } catch (err) {
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
