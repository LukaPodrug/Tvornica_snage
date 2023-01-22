import axios from 'axios'

async function getOwnTrainingsAPI(token) {
    const getOwnTrainingsResponse = await axios.get('http://localhost:3000/api/admin/training/own', {
        headers: {
            'Authorization': token
        }
    })
    return getOwnTrainingsResponse
}

export {
    getOwnTrainingsAPI
}