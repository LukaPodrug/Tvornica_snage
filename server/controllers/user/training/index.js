const database = require('../../../database')

async function getByDate(startOfDay) {
    const finishOfDay = new Date(startOfDay.getTime() + 3600*1000*24)
    try {
        const trainings = await database`
            select *
            from trainings
            where start between ${startOfDay} and ${finishOfDay}`
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