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
            with numberOfReservations as (
                select reservations."trainingId", cast(count(reservations."trainingId") as integer) as "numberOfReservations"
                from trainings
                join reservations on trainings.id = reservations."trainingId"
                where start > ${new Date(Date.now())}
                group by "trainingId"
            )

            select *
            from reservations
            join trainings on reservations."trainingId" = trainings.id
            join numberOfReservations on reservations."trainingId" = numberOfReservations."trainingId"
            where reservations."userId" = ${userId} and start > ${new Date(Date.now())}
            order by start asc`
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
            cast(sum(case when reservations.completion = true and reservations.manual = false then 1 else 0 end) as integer) as "reservationsDone",
            cast(sum(case when reservations.completion = false and reservations.manual = false then 1 else 0 end) as integer) as "reservationsSkipped",
            cast(sum(case when reservations.completion = true and reservations.manual = true then 1 else 0 end) as integer) as "nonReservationsDone"
            from reservations join trainings on reservations."trainingId" = trainings.id
            where reservations."userId" = ${userId} and trainings.finish < ${new Date(Date.now())}`
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
            from reservations join trainings on reservations."trainingId" = trainings.id
            where (reservations."userId" = ${userId} and ${start} >= trainings.start and ${start} < trainings.finish)
            or (reservations."userId" = ${userId} and ${finish} > trainings.start and ${finish} <= trainings.finish)`
        return userOccupancy[0]
    }
    catch(error) {
        return error
    }
}

async function removeByUserId(userId) {
    try {
        const removedReservations = await database`
            delete
            from reservations
            where "userId" = ${userId}
            returning *`
        return removedReservations
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
    checkUserOccupancy,
    removeByUserId
}