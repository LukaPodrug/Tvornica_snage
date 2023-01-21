import axios from 'axios'

async function loginAPI(username, password) {
    const loginResponse = await axios.post('http://localhost:3000/api/admin/auth/login', {
        username,
        password
    })
    return loginResponse
}

export {
    loginAPI
}