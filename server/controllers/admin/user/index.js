const database = require('../../../database')

async function getById(id) {
    try {
        const user = await database`
            select id, "firstName", "lastName", "dateOfBirth", "image", "membership", "level"
            from users
            where id = ${id}`
        return user[0]
    }
    catch(error) {
        return error
    }
}

async function editDetails(id, membership, level) {
    try {
        const updatedUser = await database`
            update users
            set membership = ${membership}, level = ${level}
            where id = ${id}
            returning *`
        return updatedUser[0]
    }
    catch(error) {
        return error
    }
}

async function getByName(firstName, lastName) {
    try {
        const users = await database`
            select id, "firstName", "lastName", "dateOfBirth", "image", "membership", "level"
            from users
            where LOWER("firstName") like LOWER(${'%' + firstName + '%'}) and LOWER("lastName") like LOWER(${'%' + lastName + '%'})`
        return users
    }
    catch(error) {
        return error
    }
}

async function getByPage(page) {
    try {
        const users = await database`
            select id, "firstName", "lastName", "dateOfBirth", "image", "membership", "level"
            from users
            offset ${(page - 1) * 10} rows
            fetch first 10 row only`
        return users
    }
    catch(error) {
        return error
    }
}

async function getByIds(ids) {
    try {
        const users = await database`
            select id, "firstName", "lastName", "dateOfBirth", "image", "membership", "level"
            from users
            where id = ANY(${ids})`
        return users
    }
    catch(error) {
        return error
    }
}

module.exports = {
    getById,
    editDetails,
    getByName,
    getByPage,
    getByIds
}