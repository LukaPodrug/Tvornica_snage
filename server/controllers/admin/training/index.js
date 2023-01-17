const database = require('../../../database')

async function addNew(coachId, start, finish, room, capacity, level, description) {
    try {
        const newTraining = await database`
            insert into trainings (
                coach_id, start, finish, room, capacity, level, description
            ) 
            values (
                ${coachId}, ${start}, ${finish}, ${room}, ${capacity}, ${level}, ${description}
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

async function editDetails(id, coachId, start, finish, room, capacity, level, description) {
    try {
        const updatedTraining = await database`
            update trainings
            set coach_id = ${coachId}, start = ${start}, finish = ${finish}, room = ${room}, capacity = ${capacity}, level = ${level}, description = ${description}
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
            where coach_id = ${coachId}`
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
    getByCoachId
}