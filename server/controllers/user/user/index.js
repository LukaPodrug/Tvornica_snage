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

module.exports = {
    getById,
    remove
}