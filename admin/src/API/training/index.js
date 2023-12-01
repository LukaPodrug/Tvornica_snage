import axios from '../config.js'
import moment from 'moment'

async function getOwnTrainingsByDateAPI(token, date) {
    const getOwnTrainingsByDateResponse = await axios.get('/admin/training/ownByDate', {
        params: {
            'date': moment(date).format('YYYY-MM-DD')
        },
        headers: {
            'Authorization': token
        }
    })
    return getOwnTrainingsByDateResponse
}

async function getTrainingsByDateAPI(token, date) {
    const getTrainingsByDateResponse = await axios.get('/admin/training/byDate', {
        params: {
            'date': moment(date).format('YYYY-MM-DD')
        },
        headers: {
            'Authorization': token
        }
    })
    return getTrainingsByDateResponse
}

async function addTrainingAPI(token, coachId, start, finish, room, capacity, level, programId, regime, exercises) {
    const addTrainingResponse = await axios.post('/admin/training', {
        coachId,
        start,
        finish,
        room,
        capacity,
        level,
        programId,
        regime,
        exercises
    },
    {
        headers: {
            'Authorization': token
        }
    })
    return addTrainingResponse
}

async function editTrainingAPI(token, id, coachId, start, finish, room, capacity, level, programId, regime, exercises) {
    const editTrainingResponse = await axios.patch('/admin/training', {
        id,
        coachId,
        start,
        finish,
        room,
        capacity,
        level,
        programId,
        regime,
        exercises
    },
    {
        headers: {
            'Authorization': token
        }
    })
    return editTrainingResponse
}

export {
    getOwnTrainingsByDateAPI,
    getTrainingsByDateAPI,
    addTrainingAPI,
    editTrainingAPI
}