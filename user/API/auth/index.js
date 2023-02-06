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

async function registrationAPI(image, firstName, lastName, dateOfBirth, username, password) {
    const registrationResponse = await axios.post('http://192.168.0.15:3000/api/user/auth/registration', {
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