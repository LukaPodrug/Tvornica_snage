import axios from 'axios'

async function getAllCoachesDataAPI(token) {
    const getAllCoachesDataResponse = await axios.get('http://192.168.0.15:3000/api/user/coach', {
        headers: {
            'Authorization': token
        }
    })
    return getAllCoachesDataResponse
}

export {
    getAllCoachesDataAPI
}