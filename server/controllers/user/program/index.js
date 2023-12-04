const database = require('../../../database')

async function getAll() {
    try {
        const programs = await database`
            select id, name, image
            from programs`
        return programs
    }
    catch(error) {
        return error
    }
}

module.exports = {
    getAll
}