const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const { SALT_ROUNDS, JWT_SECRET } = process.env

const database = require('../../../database')

async function getByUsername(username) {
    try {
        const admin = await database`
            select *
            from coaches
            where username = ${username}`
        return admin[0]
    }
    catch(error) {
        return error
    }
}

async function addNew(firstName, lastName, dateOfBirth, image, username, password) {
    try {
        const passwordHash = await generatePasswordHash(password)
        const registration = await database`
            insert into coaches (
                firstName, lastName, dateOfBirth, image, username, password
            ) 
            values (
                ${firstName}, ${lastName}, ${dateOfBirth}, ${image}, ${username}, ${passwordHash}
            )
            returning *`
        return registration[0]
    }
    catch(error) {
        return error
    }
}

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
    getByUsername,
    addNew,
    generateJWT,
    passwordValidation
}