const database = require('../../../database')

async function getByDate(startOfDay, userLevel) {
    const finishOfDay = new Date(startOfDay.getTime() + 3600*1000*24)
    try {
        const trainings = await database`
            with numberOfReservations as (
                select reservations."trainingId", cast(count(reservations."trainingId") as integer) as "numberOfReservations"
                from trainings
                join reservations on trainings.id = reservations."trainingId"
                where trainings.start between ${startOfDay} and ${finishOfDay} and reservations.manual = false
                group by "trainingId"
            )

            select *
            from trainings
            left join numberOfReservations on trainings.id = numberOfReservations."trainingId"
            where trainings.start between ${startOfDay} and ${finishOfDay} and trainings.level <= ${userLevel}
            order by start asc`
        return trainings
    }
    catch(error) {
        return error
    }
}

async function getById(id) {
    try {
        const training = await database`
            select *
            from trainings
            where id = ${id}`
        return training[0]
    }
    catch(error) {
        return error
    }
}

module.exports = {
    getByDate,
    getById
}