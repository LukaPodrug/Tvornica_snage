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

export {
    getReservationsByTrainingIdAPI
}