import axios from 'axios'

async function loginAPI(username, password) {
    const loginResponse = await axios.post('http://192.168.0.15:3000/api/user/auth/login', {
        username,
        password
    })
    return loginResponse
}

async function verifyTokenAPI(token) {
    const verifyTokenResponse = await axios.post('http://192.168.0.15:3000/api/user/auth/verify', {}, {
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