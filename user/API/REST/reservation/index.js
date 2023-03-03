import axios from '../config.js'

async function getActiveReservationsAPI(token) {
    const getActiveReservationsResponse = await axios.get('/user/reservation/active', {
        headers: {
            'Authorization': token
        }
    })
    return getActiveReservationsResponse
}

async function getOwnStatisticsAPI(token) {
    const getOwnStatisticsResponse = await axios.get('/user/reservation/statistics', {
        headers: {
            'Authorization': token
        }
    })
    return getOwnStatisticsResponse
}

async function addReservationAPI(token, trainingId) {
    const addReservationResponse = await axios.post('/user/reservation', {
        trainingId
    },
    {
        headers: {
            'Authorization': token
        }
    })
    return addReservationResponse
}

async function removeReservationAPI(token, trainingId) {
    const removeReservationResponse = await axios.delete('/user/reservation', {
        headers: {
            'Authorization': token
        },
        data: {
            trainingId
        }
    })
    return removeReservationResponse
}

export {
    getActiveReservationsAPI,
    getOwnStatisticsAPI,
    addReservationAPI,
    removeReservationAPI
}