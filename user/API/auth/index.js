import axios from 'axios'

async function loginAPI(username, password) {
    const loginResponse = await axios.post('http://192.168.0.15:3000/api/user/auth/login', {
        username,
        password
    })
    return loginResponse
}

export {
    loginAPI
}