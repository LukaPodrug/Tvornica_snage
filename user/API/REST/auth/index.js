import axios from '../config.js'
import baseAxios from 'axios'


async function loginAPI(username, password) {
    const loginResponse = await axios.post('/user/auth/login', {
        username,
        password
    })
    return loginResponse
}

async function verifyTokenAPI(token) {
    const verifyTokenResponse = await axios.post('/user/auth/verify', {}, {
        headers: {
            'Authorization': token
        }
    })
    return verifyTokenResponse
}

async function registrationAPI(image, firstName, lastName, dateOfBirth, username, password) {
    const registrationResponse = await axios.post('/user/auth/registration', {
        image,
        firstName,
        lastName,
        dateOfBirth,
        username,
        password
    })
    return registrationResponse
}

async function deleteAPI(token) {
    const deleteResponse = await axios.delete('/user/auth', {
        headers: {
            'Authorization': token
        }
    })
    return deleteResponse
}

export {
    loginAPI,
    verifyTokenAPI,
    registrationAPI,
    deleteAPI
}