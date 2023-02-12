import axios from 'axios'

async function getOwnDataAPI(token) {
    const getOwnDataResponse = await axios.get('https://tvornica-snage-api-8xrw.onrender.com/api/admin/coach/own', {
        headers: {
            'Authorization': token
        }
    })
    return getOwnDataResponse
}

async function getAllCoachesDataAPI(token) {
    const getAllCoachesDataResponse = await axios.get('https://tvornica-snage-api-8xrw.onrender.com/api/admin/coach/all', {
        headers: {
            'Authorization': token
        }
    })
    return getAllCoachesDataResponse
}

export {
    getOwnDataAPI,
    getAllCoachesDataAPI
}