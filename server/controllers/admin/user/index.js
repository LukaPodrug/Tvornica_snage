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

module.exports = {
    getById,
    editDetails
}