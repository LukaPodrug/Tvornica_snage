const database = require('../../../database')

async function addNew(training) {
    try {
        const newTraining = await database`
            insert into trainings (
                coach_id, start, finish, room, capacity, level, description
            ) 
            values (
                ${training.coach_id}, ${training.start}, ${training.finish}, ${training.room}, ${training.capacity}, ${training.level}, ${training.description}
            )
            returning *`
        return newTraining[0]
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

async function editDetails(training) {
    try {
        const updatedTraining = await database`
            update trainings
            set coach_id = ${training.coach_id}, start = ${training.start}, finish = ${training.finish}, room = ${training.room}, capacity = ${training.capacity}, level = ${training.level}, description = ${training.description}
            where id = ${training.id}
            returning *`
        return updatedTraining[0]
    }
    catch(error) {
        return error
    }
}

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

async function remove(id) {
    try {
        const removedTraining = await database`
            delete
            from trainings
            where id = ${id}
            returning *`
        return removedTraining[0]
    }
    catch(error) {
        return error
    }
}

module.exports = {
    addNew,
    getById,
    editDetails,
    getByDate,
    remove
}