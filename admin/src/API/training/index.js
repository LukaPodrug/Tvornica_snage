import axios from 'axios'
import moment from 'moment'

async function getOwnTrainingsByDateAPI(token, date) {
    const getOwnTrainingsByDateResponse = await axios.get('http://localhost:3000/api/admin/training/ownByDate', {
        params: {
            'date': moment(date).format('YYYY-MM-DD')
        },
        headers: {
            'Authorization': token
        }
    })
    return getOwnTrainingsByDateResponse
}

export {
    getOwnTrainingsByDateAPI
}