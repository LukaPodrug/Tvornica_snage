import axios from '../config.js'

async function getOwnDataAPI(token) {
    const getOwnDataResponse = await axios.get('/admin/coach/own', {
        headers: {
            'Authorization': token
        }
    })
    return getOwnDataResponse
}

async function getAllCoachesDataAPI(token) {
    const getAllCoachesDataResponse = await axios.get('/admin/coach/all', {
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