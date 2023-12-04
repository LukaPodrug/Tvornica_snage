const database = require('../../../database')

async function getAll() {
    try {
        const promotions = await database`
            select id, "partnerId", code, description
            from promotions`
        return promotions
    }
    catch(error) {
        return error
    }
}

module.exports = {
    getAll
}