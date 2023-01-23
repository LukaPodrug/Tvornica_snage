import axios from 'axios'

async function getOwnDataAPI(token) {
    const getOwnDataResponse = await axios.get('http://localhost:3000/api/admin/coach/own', {
        headers: {
            'Authorization': token
        }
    })
    return getOwnDataResponse
}

async function getAllCoachesDataAPI(token) {
    const getAllCoachesDataResponse = await axios.get('http://localhost:3000/api/admin/coach/all', {
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