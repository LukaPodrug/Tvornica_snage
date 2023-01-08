const database = require('../../../database')

async function getByDate(date) {
    const start = new Date(date)
    const finish = new Date(start.getTime() + 3600*1000*24)
    try {
        const trainings = await database`
            select *
            from trainings
            where start between ${start} and ${finish}`
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