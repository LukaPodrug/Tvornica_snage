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

module.exports = {
    getAll
}