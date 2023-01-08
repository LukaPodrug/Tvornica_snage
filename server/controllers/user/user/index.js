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

module.exports = {
    getById
}