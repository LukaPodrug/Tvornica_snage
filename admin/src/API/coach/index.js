import axios from 'axios'

async function getOwnAPI(token) {
    const getOwnResponse = await axios.get('http://localhost:3000/api/admin/coach/own', {
        headers: {
            'Authorization': token
        }
    })
    return getOwnResponse
}

export {
    getOwnAPI
}