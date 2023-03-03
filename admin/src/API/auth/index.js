import axios from '../config.js'

async function loginAPI(username, password) {
    const loginResponse = await axios.post('/admin/auth/login', {
        username,
        password
    })
    return loginResponse
}

async function verifyTokenAPI(token) {
    const verifyTokenResponse = await axios.post('/admin/auth/verify', {}, {
        headers: {
            'Authorization': token
        }
    })
    return verifyTokenResponse
}

async function registrationAPI(image, firstName, lastName, dateOfBirth, username, password) {
    const registrationResponse = await axios.post('/admin/auth/registration', {
        image,
        firstName,
        lastName,
        dateOfBirth,
        username,
        password
    })
    return registrationResponse
}

export {
    loginAPI,
    verifyTokenAPI,
    registrationAPI
}