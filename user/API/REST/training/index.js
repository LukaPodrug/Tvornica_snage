import axios from 'axios'

async function getTrainingsByDateAPI(token, date) {
    const getTrainingsByDateResponse = await axios.get('https://tvornica-snage-api-8xrw.onrender.com/api/user/training/byDate', {
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