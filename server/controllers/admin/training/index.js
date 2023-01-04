const database = require('../../../database')

async function addNew(training) {
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

module.exports = {
    addNew
}