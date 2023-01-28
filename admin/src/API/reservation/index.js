import axios from 'axios'

async function getReservationsByTrainingIdAPI(token, trainingId) {
    const getReservationsByTrainingIdResponse = await axios.get('http://localhost:3000/api/admin/reservation/byTrainingId', {
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
    const editReservationCompletionResponse = await axios.patch('http://localhost:3000/api/admin/reservation', {
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
    const removeReservationByTrainingIdAndUserIdResponse = await axios.delete('http://localhost:3000/api/admin/reservation', {
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
    const addunannouncedCompletionResponse = await axios.post('http://localhost:3000/api/admin/reservation', {
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