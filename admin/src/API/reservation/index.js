import axios from '../config.js'

async function getReservationsByTrainingIdAPI(token, trainingId) {
    const getReservationsByTrainingIdResponse = await axios.get('/admin/reservation/byTrainingId', {
        params: {
            'trainingId': trainingId
        },
        headers: {
            'Authorization': token
        }
    })
    return getReservationsByTrainingIdResponse
}

async function editReservationCompletionAPI(token, trainingId, userId, completion) {
    const editReservationCompletionResponse = await axios.patch('/admin/reservation', {
        trainingId,
        userId,
        completion
    },
    {
        headers: {
            'Authorization': token
        }
    })
    return editReservationCompletionResponse
}

async function removeReservationByTrainingIdAndUserIdAPI(token, trainingId, userId) {
    const removeReservationByTrainingIdAndUserIdResponse = await axios.delete('/admin/reservation', {
        headers: {
            'Authorization': token
        },
        data: {
            trainingId,
            userId
        }
    })
    return removeReservationByTrainingIdAndUserIdResponse
}

async function addunannouncedCompletionAPI(token, trainingId, userId) {
    const addunannouncedCompletionResponse = await axios.post('/admin/reservation', {
        trainingId,
        userId,    
    },
    {
        headers: {
            'Authorization': token
        }
    })
    return addunannouncedCompletionResponse
}

export {
    getReservationsByTrainingIdAPI,
    editReservationCompletionAPI,
    removeReservationByTrainingIdAndUserIdAPI,
    addunannouncedCompletionAPI
}