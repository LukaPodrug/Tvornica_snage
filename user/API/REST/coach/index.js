import axios from '../config.js'

async function getAllCoachesDataAPI(token) {
    const getAllCoachesDataResponse = await axios.get('/user/coach', {
        headers: {
            'Authorization': token
        }
    })
    return getAllCoachesDataResponse
}

export {
    getAllCoachesDataAPI
}