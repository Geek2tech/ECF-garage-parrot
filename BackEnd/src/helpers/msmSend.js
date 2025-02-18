const logger = require("../services/Logger");


async function  sendMsmNotification( password, message, to) {

    logger.log({
        level: 'info',
        module: 'msm',
        message: ` start msm api call  `
    })
const frontUrl = process.env.APP_MSM_FRONT_URL

    const validity = process.env.APP_MSM_VALIDITY
    const from = process.env.APP_MSM_FROM
    const maxOpen = process.env.APP_MSM_MAXOPEN

    const body = {
        validity,
        password,
        message,
        to,
        from,
        maxOpen,
        frontUrl
    }
    const msmUrl = process.env.APP_MSM_URL
  const msmKey = process.env.APP_MSM_APIKEY
 //const msmKey = ""


    const msmRequest = await fetch(msmUrl + '/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+ msmKey
        },
        body: JSON.stringify(body)
    }).then(

        response => response.json()

    ).catch(
        error =>error.message
    )

    return msmRequest

}


module.exports =  sendMsmNotification





