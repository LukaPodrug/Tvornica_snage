const database = require('../../../database')

async function getAll() {
    try {
        const coaches = await database`
            select id, first_name, last_name, image
            from coaches`
        return coaches
    }
    catch(error) {
        return error
    }
}

module.exports = {
    getAll
}