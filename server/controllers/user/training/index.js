const database = require('../../../database')

async function getByDate(startOfDay) {
    const finishOfDay = new Date(startOfDay.getTime() + 3600*1000*24)
    try {
        const trainings = await database`
            with numberOfReservations as (
                select "trainingId", cast(count("trainingId") as integer) as "numberOfReservations"
                from trainings
                join reservations on id = "trainingId"
                where start between ${startOfDay} and ${finishOfDay}
                group by "trainingId"
            )

            select *
            from trainings
            left join numberOfReservations on trainings.id = numberOfReservations."trainingId"
            where start between ${startOfDay} and ${finishOfDay}
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