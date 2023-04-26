import axios from '../config.js'

async function getPartnersDataAPI(token) {
    const getPartnersDataResponse = await axios.get('/user/partner', {
        headers: {
            'Authorization': token
        }
    })
    return getPartnersDataResponse
}

export {
    getPartnersDataAPI
}