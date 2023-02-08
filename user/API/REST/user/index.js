import axios from 'axios'

async function getOwnDataAPI(token) {
    const getOwnDataResponse = await axios.get('https://tvornica-snage-api.onrender.com/api/user/user', {
        headers: {
            'Authorization': token
        }
    })
    return getOwnDataResponse
}

export {
    getOwnDataAPI
}