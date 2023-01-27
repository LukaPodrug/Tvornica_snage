const database = require('../../../database')

async function removeByTrainingId(trainingId) {
    try {
        const removedReservations = await database`
            delete
            from reservations
            where "trainingId" = ${trainingId}
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
            where "userId" = ${userId} and "trainingId" = ${trainingId}`
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
                "trainingId", "userId", completion, manual
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

async function editCompletion(userId, trainingId, completion) {
    try {
        const updatedReservation = await database`
            update reservations
            set completion = ${completion}
            where "userId" = ${userId} and "trainingId" = ${trainingId}
            returning *`
        return updatedReservation[0]
    }
    catch(error) {
        return error
    }
}

async function getByTrainingId(trainingId) {
    try {
        const reservations = await database`
            select *
            from reservations join users on "userId" = id
            where "trainingId" = ${trainingId}`
        return reservations
    }
    catch(error) {
        return error
    }
}

async function removeByUserIdAndTrainingId(userId, trainingId) {
    try {
        const removedReservations = await database`
            delete
            from reservations
            where "userId" = ${userId} and "trainingId" = ${trainingId}
            returning *`
        return removedReservations
    }
    catch(error) {
        return error
    }
}

module.exports = {
    removeByTrainingId,
    getByUserIdAndTrainingId,
    addNew,
    editCompletion,
    getByTrainingId,
    removeByUserIdAndTrainingId
}