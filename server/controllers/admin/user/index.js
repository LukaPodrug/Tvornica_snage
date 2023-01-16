const database = require('../../../database')

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
            select *
            from users
            where first_name like ${'%' + firstName + '%'} and last_name like ${'%' + lastName + '%'}`
        return users
    }
    catch(error) {
        return error
    }
}

module.exports = {
    getById,
    editDetails,
    getByName
}