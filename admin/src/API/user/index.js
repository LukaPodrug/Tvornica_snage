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

export {
    getUsersByFirstNameAndLastNameAPI
}