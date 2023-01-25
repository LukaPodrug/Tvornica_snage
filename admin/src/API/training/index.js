import axios from 'axios'
import moment from 'moment'

async function getOwnTrainingsByDateAPI(token, date) {
    const getOwnTrainingsByDateResponse = await axios.get('http://localhost:3000/api/admin/training/ownByDate', {
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
    const getTrainingsByDateResponse = await axios.get('http://localhost:3000/api/admin/training/byDate', {
        params: {
            'date': moment(date).format('YYYY-MM-DD')
        },
        headers: {
            'Authorization': token
        }
    })
    return getTrainingsByDateResponse
}

async function addTrainingAPI(token, coachId, start, finish, room, capacity, level, title, regime, exercises) {
    const addTrainingResponse = await axios.post('http://localhost:3000/api/admin/training', {
        coachId,
        start,
        finish,
        room,
        capacity,
        level,
        title,
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

export {
    getOwnTrainingsByDateAPI,
    getTrainingsByDateAPI,
    addTrainingAPI
}