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

export {
    getActiveReservationsAPI,
    getOwnStatisticsAPI
}