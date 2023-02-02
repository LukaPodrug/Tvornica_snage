import axios from 'axios'

async function getOwnDataAPI(token) {
    const getOwnDataResponse = await axios.get('http://192.168.0.15:3000/api/user/user', {
        headers: {
            'Authorization': token
        }
    })
    return getOwnDataResponse
}

export {
    getOwnDataAPI
}