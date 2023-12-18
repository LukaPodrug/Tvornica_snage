const database = require('../../../database')

const authController = require('../auth')

async function getById(id) {
    try {
        const user = await database`
            select *
            from users
            where id = ${id}`
        return user[0]
    }
    catch(error) {
        return error
    }
}

async function remove(id) {
    try {
        const removedUser = await database`
            delete
            from users
            where id = ${id}
            returning *`
        return removedUser[0]
    }
    catch(error) {
        return error
    }
}

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
        const passwordHash = await authController.generatePasswordHash(password)
        const membership = new Date(Date.now() + 3600*1000*24*7)
        const level = 1
        const registration = await database`
            insert into users (
                "firstName", "lastName", "dateOfBirth", image, username, password, membership, level
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

module.exports = {
    getById,
    remove,
    addNew,
    getByUsername
}