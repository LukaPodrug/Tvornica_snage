import axios from 'axios'

async function getReservationsByTrainingIdAPI(token, trainingId) {
    const getReservationsByTrainingIdResponse = await axios.get('https://tvornica-snage-api-8xrw.onrender.com/api/admin/reservation/byTrainingId', {
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
    const editReservationCompletionResponse = await axios.patch('https://tvornica-snage-api-8xrw.onrender.com/api/admin/reservation', {
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
    const removeReservationByTrainingIdAndUserIdResponse = await axios.delete('https://tvornica-snage-api-8xrw.onrender.com/api/admin/reservation', {
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
    const addunannouncedCompletionResponse = await axios.post('https://tvornica-snage-api-8xrw.onrender.com/api/admin/reservation', {
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