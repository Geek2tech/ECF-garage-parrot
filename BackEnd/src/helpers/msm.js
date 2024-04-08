async function  sendMsmNotification(validity, password, message, to, from, maxOpen, frontUrl) {

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

    console.log('msmUrl', msmUrl)
    console.log('msmKey', msmKey)
    console.log('body', body)

    const msmRequest = await fetch(msmUrl + '/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+ msmKey
        },
        body: JSON.stringify(body)
    })
    console.log('msmRequest', msmRequest)

}

module.exports = sendMsmNotification

