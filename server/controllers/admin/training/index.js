const database = require('../../../database')

const programController = require('../program')

async function addNew(coachId, start, finish, room, capacity, level, programId, regime, exercises) {
    try {
        const programs = await programController.getAll()

        let program = programs.find(program => {
            return program.id == programId
        })

        const newTraining = await database`
            insert into trainings (
                "coachId", start, finish, room, capacity, level, "programId", regime, exercises, title
            ) 
            values (
                ${coachId}, ${start}, ${finish}, ${room}, ${capacity}, ${level}, ${programId}, ${regime}, ${exercises}, ${program.name}
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

async function editDetails(id, coachId, start, finish, room, capacity, level, programId, regime, exercises) {
    try {
        const programs = await programController.getAll()

        let program = programs.find(program => {
            return program.id == programId
        })

        const updatedTraining = await database`
            update trainings
            set "coachId" = ${coachId}, start = ${start}, finish = ${finish}, room = ${room}, capacity = ${capacity}, level = ${level}, "programId" = ${programId}, regime = ${regime}, exercises = ${exercises}, title=${program.name}
            where id = ${id}
            returning *`
        return updatedTraining[0]
    }
    catch(error) {
        return error
    }
}

async function getByDate(startOfDay) {
    const finishOfDay = new Date(startOfDay.getTime() + 24*60*60*1000)
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
            or (room = ${room} and ${finish} > start and ${finish} <= finish)`
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
            or (room = ${room} and ${finish} > start and ${finish} <= finish and id != ${id})`
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
    const finishOfDay = new Date(startOfDay.getTime() + 24*60*60*1000)
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

async function checkCoachOccupancyNew(coachId, start, finish) {
    try {
        const coachOccupation = await database`
            select
            from trainings
            where ("coachId" = ${coachId} and ${start} >= start and ${start} < finish)
            or ("coachId" = ${coachId} and ${finish} > start and ${finish} <= finish)`
        return coachOccupation[0]
    }
    catch(error) {
        return error
    }
}

async function checkCoachOccupancyEdit(id, coachId, start, finish) {
    try {
        const coachOccupation = await database`
            select
            from trainings
            where ("coachId" = ${coachId} and ${start} >= start and ${start} < finish and id != ${id})
            or ("coachId" = ${coachId} and ${finish} > start and ${finish} <= finish and id != ${id})`
        return coachOccupation[0]
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
    getByCoachIdAndDate,
    checkCoachOccupancyNew,
    checkCoachOccupancyEdit
}