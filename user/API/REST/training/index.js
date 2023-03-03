import axios from '../config.js'

async function getTrainingsByDateAPI(token, date) {
    const getTrainingsByDateResponse = await axios.get('/user/training/byDate', {
        params: {
            'date': date
        },
        headers: {
            'Authorization': token
        }
    })
    return getTrainingsByDateResponse
}

export {
    getTrainingsByDateAPI
}