const database = require('../../../database')

async function getAll() {
    try {
        const partners = await database`
            select id, name, link
            from partners`
        return partners
    }
    catch(error) {
        return error
    }
}

module.exports = {
    getAll
}