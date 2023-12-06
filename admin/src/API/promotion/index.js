import axios from '../config.js'

async function getPromotionsDataAPI(token) {
    const getPromotionsDataResponse = await axios.get('/admin/promotion', {
        headers: {
            'Authorization': token
        }
    })
    return getPromotionsDataResponse
}

async function addPromotionAPI(token, partnerId, code, description) {
    const addPromotionResponse = await axios.post('/admin/promotion', {
        partnerId, 
        code,
        description
    },
    {
        headers: {
            'Authorization': token
        }
    })
    return addPromotionResponse
}

async function editPromotionAPI(token, id, partnerId, code, description) {
    const editPromotionResponse = await axios.patch('/admin/promotion', {
        id,
        partnerId, 
        code,
        description
    },
    {
        headers: {
            'Authorization': token
        }
    })
    return editPromotionResponse
}

async function deletePromotionAPI(token, id) {
    const deletePromotionResponse = await axios.delete('/admin/promotion', {
        headers: {
            'Authorization': token
        },
        data: {
            id
        }
    })
    return deletePromotionResponse
}

export {
    getPromotionsDataAPI,
    addPromotionAPI,
    editPromotionAPI,
    deletePromotionAPI
}