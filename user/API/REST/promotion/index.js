import axios from '../config.js'

async function getPromotionsDataAPI(token) {
    const getPromotionsDataResponse = await axios.get('/user/promotion', {
        headers: {
            'Authorization': token
        }
    })
    return getPromotionsDataResponse
}

export {
    getPromotionsDataAPI
}