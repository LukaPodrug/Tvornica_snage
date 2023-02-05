const database = require('../../../database')

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

async function getCountByTrainingId(trainingId) {
    try {
        const reservation = await database`
            select cast(count(*) as integer)
            from reservations
            where "trainingId" = ${trainingId}`
        return reservation[0].count
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

async function remove(userId, trainingId) {
    try {
        const removedReservation = await database`
            delete
            from reservations
            where "trainingId" = ${trainingId} and "userId" = ${userId}
            returning *`
        return removedReservation[0]
    }
    catch(error) {
        return error
    }
}

async function getActiveByUserId(userId) {
    try {
        const reservations = await database`
            select *
            from reservations join trainings on "trainingId" = id
            where "userId" = ${userId} and start > ${new Date(Date.now())}`
        return reservations
    }
    catch(error) {
        return error
    }
}

async function getStatisticsByUserId(userId) {
    try {
        const statistics = await database`
            select
            cast(sum(case when completion = true and manual = false then 1 else 0 end) as integer) as "reservationsDone",
            cast(sum(case when completion = false and manual = false then 1 else 0 end) as integer) as "reservationsSkipped",
            cast(sum(case when completion = true and manual = true then 1 else 0 end) as integer) as "nonReservationsDone"
            from reservations join trainings on "trainingId" = id
            where "userId" = ${userId} and finish < ${new Date(Date.now())}`
        return statistics
    }
    catch(error) {
        return error
    }
}

async function checkUserOccupancy(userId , start, finish) {
    try {
        const userOccupancy = await database`
            select *
            from reservations join trainings on "trainingId" = id
            where ("userId" = ${userId} and ${start} >= start and ${start} < finish)
            or ("userId" = ${userId} and ${finish} > start and ${finish} <= finish)`
        return userOccupancy[0]
    }
    catch(error) {
        return error
    }
}

module.exports = {
    getByUserIdAndTrainingId,
    getCountByTrainingId,
    addNew,
    remove,
    getActiveByUserId,
    getStatisticsByUserId,
    checkUserOccupancy
}