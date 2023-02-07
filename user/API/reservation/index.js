import axios from 'axios'

async function getActiveReservationsAPI(token) {
    const getActiveReservationsResponse = await axios.get('https://tvornica-snage-api.onrender.com/api/user/reservation/active', {
        headers: {
            'Authorization': token
        }
    })
    return getActiveReservationsResponse
}

async function getOwnStatisticsAPI(token) {
    const getOwnStatisticsResponse = await axios.get('https://tvornica-snage-api.onrender.com/api/user/reservation/statistics', {
        headers: {
            'Authorization': token
        }
    })
    return getOwnStatisticsResponse
}

async function addReservationAPI(token, trainingId) {
    const addReservationResponse = await axios.post('https://tvornica-snage-api.onrender.com/api/user/reservation', {
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
    const removeReservationResponse = await axios.delete('https://tvornica-snage-api.onrender.com/api/user/reservation', {
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