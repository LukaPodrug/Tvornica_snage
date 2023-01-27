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

async function editReservationCompletion(token, trainingId, userId, completion) {
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

export {
    getReservationsByTrainingIdAPI,
    editReservationCompletion
}