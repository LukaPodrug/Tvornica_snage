import axios from 'axios'

async function getUsersByFirstNameAndLastNameAPI(token, firstName, lastName) {
    const getUsersByFirstNameAndLastNameResponse = await axios.get('http://localhost:3000/api/admin/user/byName', {
        params: {
            'firstName': firstName,
            'lastName': lastName

        },
        headers: {
            'Authorization': token
        }
    })
    return getUsersByFirstNameAndLastNameResponse
}

async function getNumberOfUsersAPI(token) {
    const getNumberOfUsersResponse = await axios.get('http://localhost:3000/api/admin/user/totalNumber', {
        headers: {
            'Authorization': token
        }
    })
    return getNumberOfUsersResponse
}

async function getUsersByPageAPI(token, page) {
    const getUsersByPageResponse = await axios.get('http://localhost:3000/api/admin/user/byPage', {
        params: {
            'page': page,

        },
        headers: {
            'Authorization': token
        }
    })
    return getUsersByPageResponse
}

export {
    getUsersByFirstNameAndLastNameAPI,
    getNumberOfUsersAPI,
    getUsersByPageAPI
}