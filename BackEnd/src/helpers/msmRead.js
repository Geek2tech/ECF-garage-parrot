const logger = require("../services/Logger");

async function readMsmMessage(id, password) {

    const msmUrl = process.env.APP_MSM_URL
    const msmKey = process.env.APP_MSM_APIKEY

    console.log(msmUrl + '/read/' + id)
    console.log('password: ' + password)
    const body = {

        password

    }
    console.log(body)
    const msmMessage = await fetch(msmUrl + '/read/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application-json',
            'Authorization': 'bearer ' + msmKey
        },
        body: JSON.stringify(body)
    }).then(
        response => response.json()
    ).catch(
        error => error.message
    )
    console.log(msmMessage)
    return msmMessage
}

module.exports = readMsmMessage
