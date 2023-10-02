const uploadFile = require("../middleware/upload")
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
    const directoryPath = __basedir + "/resources/"

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            })
        }
    })
}

module.exports = {
    upload,
    download,
}
