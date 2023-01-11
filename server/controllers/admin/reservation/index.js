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

async function getByUserIdAndTrainingId(userId, trainingId) {
    try {
        const reservation = await database`
            select *
            from reservations
            where user_id = ${userId} and training_id = ${trainingId}`
        return reservation[0]
    }
    catch(error) {
        return error
    }
}

async function addNew(userId, trainingId) {
    try {
        const completion = true
        const manual = true
        const newReservation = await database`
            insert into reservations (
                training_id, user_id, completion, manual
            )
            values (
                ${trainingId}, ${userId}, ${completion}, ${manual}
            )
            returning *`
        return newReservation[0]
    }
    catch(error) {
        return error
    }
}

module.exports = {
    removeByTrainingId,
    getByUserIdAndTrainingId,
    addNew
}