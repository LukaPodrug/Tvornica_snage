import axios from 'axios'

async function getAllCoachesDataAPI(token) {
    const getAllCoachesDataResponse = await axios.get('https://tvornica-snage-api-8xrw.onrender.com/api/user/coach', {
        headers: {
            'Authorization': token
        }
    })
    return getAllCoachesDataResponse
}

export {
    getAllCoachesDataAPI
}