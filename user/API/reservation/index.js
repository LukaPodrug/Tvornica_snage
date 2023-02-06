import axios from 'axios'

async function getActiveReservationsAPI(token) {
    const getActiveReservationsResponse = await axios.get('http://192.168.0.15:3000/api/user/reservation/active', {
        headers: {
            'Authorization': token
        }
    })
    return getActiveReservationsResponse
}

async function getOwnStatisticsAPI(token) {
    const getOwnStatisticsResponse = await axios.get('http://192.168.0.15:3000/api/user/reservation/statistics', {
        headers: {
            'Authorization': token
        }
    })
    return getOwnStatisticsResponse
}

async function addReservationAPI(token, trainingId) {
    const addReservationResponse = await axios.post('http://192.168.0.15:3000/api/user/reservation', {
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
    const removeReservationResponse = await axios.delete('http://192.168.0.15:3000/api/user/reservation', {
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