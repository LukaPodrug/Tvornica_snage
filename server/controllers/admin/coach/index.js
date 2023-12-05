const database = require('../../../database')

async function getAll() {
    try {
        const coaches = await database`
            select id, "firstName", "lastName", image
            from coaches`
        return coaches
    }
    catch(error) {
        return error
    }
}

async function getById(id) {
    try {
        const coaches = await database`
            select *
            from coaches
            where id = ${id}`
        return coaches
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
                "firstName", "lastName", "dateOfBirth", image, username, password
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

module.exports = {
    getAll,
    getById,
    addNew,
    getByUsername
}