import axios from '../config.js'

async function getPartnersDataAPI(token) {
    const getPartnersDataResponse = await axios.get('/admin/partner', {
        headers: {
            'Authorization': token
        }
    })
    return getPartnersDataResponse
}

async function addPartnerAPI(token, name, link) {
    const addPartnerResponse = await axios.post('/admin/partner', {
        name, 
        link
    },
    {
        headers: {
            'Authorization': token
        }
    })
    return addPartnerResponse
}

async function editPartnerAPI(token, id, name, link) {
    const editPartnerResponse = await axios.patch('/admin/partner', {
        id,
        name, 
        link
    },
    {
        headers: {
            'Authorization': token
        }
    })
    return editPartnerResponse
}

async function deletePartnerAPI(token, id) {
    const deletePartnerResponse = await axios.delete('/admin/partner', {
        headers: {
            'Authorization': token
        },
        data: {
            id
        }
    })
    return deletePartnerResponse
}

export {
    getPartnersDataAPI,
    addPartnerAPI,
    editPartnerAPI,
    deletePartnerAPI
}