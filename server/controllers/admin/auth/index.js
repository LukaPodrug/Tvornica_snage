const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const database = require('../../../database')

async function checkUsername(username) {
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
    const { SALT_ROUNDS } = process.env
    const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS))
    const passwordHash = await bcrypt.hash(passwordText, salt)
    return passwordHash
}

async function generateJWT(id, username) {
    const { JWT_SECRET } = process.env
    const payload = {
        id,
        username
    }
    const token = jwt.sign(payload, JWT_SECRET)
    return token
}


module.exports = {
    checkUsername,
    addNew,
    generateJWT
}