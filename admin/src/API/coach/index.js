import axios from 'axios'

async function getOwnDataAPI(token) {
    const getOwnDataResponse = await axios.get('http://localhost:3000/api/admin/coach/own', {
        headers: {
            'Authorization': token
        }
    })
    return getOwnDataResponse
}

export {
    getOwnDataAPI
}