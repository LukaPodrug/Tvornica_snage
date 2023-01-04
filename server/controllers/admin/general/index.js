const jwt = require('jsonwebtoken')

require('dotenv').config()
const { JWT_SECRET } = process.env

async function verifyJWT(token) {
    const tokenValidation = jwt.decode(token, JWT_SECRET)
    if(!tokenValidation) {
        return false
    }
    if(tokenValidation.role !== 'coach') {
        return false
    }
    return true
}

module.exports = {
    verifyJWT
}