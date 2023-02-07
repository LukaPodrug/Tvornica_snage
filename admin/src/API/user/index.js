import axios from 'axios'

async function getUsersByFirstNameAndLastNameAPI(token, firstName, lastName) {
    const getUsersByFirstNameAndLastNameResponse = await axios.get('https://tvornica-snage-api.onrender.com/api/admin/user/byName', {
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
    const getNumberOfUsersResponse = await axios.get('https://tvornica-snage-api.onrender.com/api/admin/user/totalNumber', {
        headers: {
            'Authorization': token
        }
    })
    return getNumberOfUsersResponse
}

async function getUsersByPageAPI(token, page, numberOfUsers) {
    const getUsersByPageResponse = await axios.get('https://tvornica-snage-api.onrender.com/api/admin/user/byPage', {
        params: {
            'page': page,
            'numberOfUsers': numberOfUsers
        },
        headers: {
            'Authorization': token
        }
    })
    return getUsersByPageResponse
}

async function editUserAPI(token, id, membership, level) {
    const editUserResponse = await axios.patch('https://tvornica-snage-api.onrender.com/api/admin/user', {
        id,
        membership,
        level
    },
    {
        headers: {
            'Authorization': token
        }
    })
    return editUserResponse
}

async function getUsersByExpiringMembershipsAPI(token) {
    const getUsersByExpiringMembershipsResponse = await axios.get('https://tvornica-snage-api.onrender.com/api/admin/user/byExpiringMembership', {
        headers: {
            'Authorization': token
        }
    })
    return getUsersByExpiringMembershipsResponse
}

async function getUsersByBirthdaysAPI(token) {
    const getUsersByBirthdaysResponse = await axios.get('https://tvornica-snage-api.onrender.com/api/admin/user/byBirthdays', {
        headers: {
            'Authorization': token
        }
    })
    return getUsersByBirthdaysResponse
}

async function getUsersByAwardsAPI(token) {
    const getUsersByAwardsResponse = await axios.get('https://tvornica-snage-api.onrender.com/api/admin/user/byAwards', {
        headers: {
            'Authorization': token
        }
    })
    return getUsersByAwardsResponse
}

export {
    getUsersByFirstNameAndLastNameAPI,
    getNumberOfUsersAPI,
    getUsersByPageAPI,
    editUserAPI,
    getUsersByExpiringMembershipsAPI,
    getUsersByBirthdaysAPI,
    getUsersByAwardsAPI
}