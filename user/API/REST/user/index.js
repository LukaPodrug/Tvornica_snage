import axios from '../config.js'

async function getOwnDataAPI(token) {
    const getOwnDataResponse = await axios.get('/user/user', {
        headers: {
            'Authorization': token
        }
    })
    return getOwnDataResponse
}

export {
    getOwnDataAPI
}