const dotenv = require('dotenv')
const result = dotenv.config({path: __basedir + "/.env"})
const {parsed: envs } =result

module.exports = {
envs
}