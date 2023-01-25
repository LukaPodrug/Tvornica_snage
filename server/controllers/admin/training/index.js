const database = require('../../../database')

async function addNew(coachId, start, finish, room, capacity, level, title, regime, exercises) {
    try {
        const newTraining = await database`
            insert into trainings (
                "coachId", start, finish, room, capacity, level, title, regime, exercisesption
            ) 
            values (
                ${coachId}, ${start}, ${finish}, ${room}, ${capacity}, ${level}, ${title}, ${regime}, ${exercises}
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

async function editDetails(id, coachId, start, finish, room, capacity, level, title, regime, exercises) {
    try {
        const updatedTraining = await database`
            update trainings
            set "coachId" = ${coachId}, start = ${start}, finish = ${finish}, room = ${room}, capacity = ${capacity}, level = ${level}, title = ${title}, regime = ${regime}, exercises = ${exercises}
            where id = ${id}
            returning *`
        return updatedTraining[0]
    }
    catch(error) {
        return error
    }
}

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

async function checkRoomOccupationNew(room, start, finish) {
    try {
        const roomOccupation = await database`
            select
            from trainings
            where (room = ${room} and ${start} >= start and ${start} < finish)
            or (room = ${room} and ${finish} >= start and ${finish} < finish)`
        return roomOccupation[0]
    }
    catch(error) {
        return error
    }
}

async function checkRoomOccupationEdit(id, room, start, finish) {
    try {
        const roomOccupation = await database`
            select
            from trainings
            where (room = ${room} and ${start} >= start and ${start} < finish and id != ${id})
            or (room = ${room} and ${finish} >= start and ${finish} < finish and id != ${id})`
        return roomOccupation[0]
    }
    catch(error) {
        return error
    }
}

async function getByCoachId(coachId) {
    try {
        const trainings = await database`
            select *
            from trainings
            where "coachId" = ${coachId}`
        return trainings
    }
    catch(error) {
        return error
    }
}

async function getByCoachIdAndDate(coachId, startOfDay) {
    const finishOfDay = new Date(startOfDay.getTime() + 3600*1000*24)
    try {
        const trainings = await database`
            select *
            from trainings
            where "coachId" = ${coachId} and start between ${startOfDay} and ${finishOfDay}`
        return trainings
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
    remove,
    checkRoomOccupationNew,
    checkRoomOccupationEdit,
    getByCoachId,
    getByCoachIdAndDate
}