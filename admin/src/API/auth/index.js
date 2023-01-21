import axios from 'axios'

async function loginAPI(username, password) {
    const loginResponse = await axios.post('http://localhost:3000/api/admin/auth/login', {
        username,
        password
    })
    return loginResponse
}

async function verifyTokenAPI(token) {
    const verifyTokenResponse = await axios.post('http://localhost:3000/api/admin/auth/verify', {}, {
        headers: {
            'Authorization': token
        }
    })
    return verifyTokenResponse
}

export {
    loginAPI,
    verifyTokenAPI
}