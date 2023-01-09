const database = require('../../../database')

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
        const manual = false
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

async function remove(userId, trainingId) {
    try {
        const removedReservation = await database`
            delete
            from reservations
            where training_id = ${trainingId} and user_id = ${userId}
            returning *`
        return removedReservation[0]
    }
    catch(error) {
        return error
    }
}

module.exports = {
    getByUserIdAndTrainingId,
    addNew,
    remove
}