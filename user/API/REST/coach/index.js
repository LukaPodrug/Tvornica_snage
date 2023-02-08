import axios from 'axios'

async function getAllCoachesDataAPI(token) {
    const getAllCoachesDataResponse = await axios.get('https://tvornica-snage-api.onrender.com/api/user/coach', {
        headers: {
            'Authorization': token
        }
    })
    return getAllCoachesDataResponse
}

export {
    getAllCoachesDataAPI
}