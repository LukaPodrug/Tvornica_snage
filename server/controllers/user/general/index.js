const jwt = require('jsonwebtoken')
const { PostgresError } = require('postgres')

require('dotenv').config()
const { JWT_SECRET } = process.env

const userController = require('../user')

async function verifyJWT(token) {
    const tokenValidation = jwt.decode(token, JWT_SECRET)
    if(!tokenValidation) {
        return false
    }
    if(tokenValidation.role !== 'user') {
        return false
    }
    const user = await userController.getById(tokenValidation.id)
    const databaseConnection = await checkDatabaseConnection(user)
    if(!databaseConnection) {
        return false
    }
    if(!user) {
        return false
    }
    return tokenValidation
}

async function checkDatabaseConnection(data) {
    if(data instanceof PostgresError) {
        return false
    }
    return true
}

module.exports = {
    verifyJWT,
    checkDatabaseConnection
}