const jwt = require('jsonwebtoken')
const { PostgresError } = require('postgres')

require('dotenv').config()
const { JWT_SECRET } = process.env

const coachController = require('../coach')

async function verifyJWT(token) {
    const tokenValidation = jwt.decode(token, JWT_SECRET)
    if(!tokenValidation) {
        return false
    }
    if(tokenValidation.role !== 'coach') {
        return false
    }
    const coach = await coachController.getById(tokenValidation.id)
    const databaseConnection = await checkDatabaseConnection(coach)
    if(!databaseConnection) {
        return false
    }
    if(!coach) {
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