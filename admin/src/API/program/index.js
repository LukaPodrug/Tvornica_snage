import axios from '../config.js'

async function getProgramsDataAPI(token) {
    const getProgramsDataResponse = await axios.get('/admin/program', {
        headers: {
            'Authorization': token
        }
    })
    return getProgramsDataResponse
}

async function addProgramAPI(token, name, image) {
    const addProgramResponse = await axios.post('/admin/program', {
        name, 
        image
    },
    {
        headers: {
            'Authorization': token
        }
    })
    return addProgramResponse
}

async function editProgramAPI(token, id, name, image) {
    const editProgramResponse = await axios.patch('/admin/program', {
        id,
        name, 
        image
    },
    {
        headers: {
            'Authorization': token
        }
    })
    return editProgramResponse
}

export {
    getProgramsDataAPI,
    addProgramAPI,
    editProgramAPI
}