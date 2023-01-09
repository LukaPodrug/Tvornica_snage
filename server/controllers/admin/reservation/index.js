const database = require('../../../database')

async function removeByTrainingId(trainingId) {
    try {
        const removedReservations = await database`
            delete
            from reservations
            where training_id = ${trainingId}
            returning *`
        return removedReservations
    }
    catch(error) {
        return error
    }
}

module.exports = {
    removeByTrainingId
}