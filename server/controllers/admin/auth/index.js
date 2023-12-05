const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const { SALT_ROUNDS, JWT_SECRET } = process.env

const database = require('../../../database')

async function generatePasswordHash(passwordText) {
    const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS))
    const passwordHash = await bcrypt.hash(passwordText, salt)
    return passwordHash
}

async function generateJWT(id, username) {
    const payload = {
        id,
        username,
        role: 'coach'
    }
    const token = jwt.sign(payload, JWT_SECRET)
    return token
}

async function passwordValidation(passwordText, passwordHash) {
    const passwordValidation = await bcrypt.compare(passwordText, passwordHash)
    return passwordValidation
}

module.exports = {
    generateJWT,
    passwordValidation
}