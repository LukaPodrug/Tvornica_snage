import axios from '../config.js'

async function getProgramsDataAPI(token) {
    const getProgramsDataResponse = await axios.get('/user/program', {
        headers: {
            'Authorization': token
        }
    })
    return getProgramsDataResponse
}

export {
    getProgramsDataAPI
}