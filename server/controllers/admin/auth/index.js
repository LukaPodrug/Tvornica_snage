const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const { SALT_ROUNDS, JWT_SECRET } = process.env

const database = require('../../../database')

async function getByUsername(username) {
    const admin = await database`
        select *
        from coaches
        where username = ${username}`
    return admin[0]
}

async function addNew(admin) {
    const passwordHash = await generatePasswordHash(admin.password)
    const registration = await database`
        insert into coaches (
            first_name, last_name, date_of_birth, image, username, password
        ) 
        values (
            ${admin.firstName}, ${admin.lastName}, ${admin.dateOfBirth}, ${admin.image}, ${admin.username}, ${passwordHash}
        )
        returning *`
    return registration[0]
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