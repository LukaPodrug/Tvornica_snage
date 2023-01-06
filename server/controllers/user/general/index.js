const { PostgresError } = require('postgres')

async function checkDatabaseConnection(data) {
    if(data instanceof PostgresError) {
        return false
    }
    return true
}

module.exports = {
    checkDatabaseConnection
}