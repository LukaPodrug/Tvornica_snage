import axios from 'axios'

async function getActiveReservationsAPI(token) {
    const getActiveReservationsResponse = await axios.get('http://192.168.0.15:3000/api/user/reservation/active', {
        headers: {
            'Authorization': token
        }
    })
    return getActiveReservationsResponse
}

export {
    getActiveReservationsAPI
}