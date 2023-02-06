import axios from 'axios'

async function getTrainingsByDateAPI(token, date) {
    const getTrainingsByDateResponse = await axios.get('http://192.168.0.15:3000/api/user/training/byDate', {
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