const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const { SALT_ROUNDS, JWT_SECRET } = process.env

const database = require('../../../database')

async function getByUsername(username) {
    try {
        const user = await database`
            select *
            from users
            where username = ${username}`
        return user[0]
    }
    catch(error) {
        return error
    }
}

async function addNew(firstName, lastName, dateOfBirth, image, username, password) {
    try {
        const passwordHash = await generatePasswordHash(password)
        const membership = new Date(Date.now() + 3600*1000*24*30)
        const level = 1
        const registration = await database`
            insert into users (
                first_name, last_name, date_of_birth, image, username, password, membership, level
            ) 
            values (
                ${firstName}, ${lastName}, ${dateOfBirth}, ${image}, ${username}, ${passwordHash}, ${membership}, ${level}
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
        role: 'user'
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