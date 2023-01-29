const database = require('../../../database')

async function getById(id) {
    try {
        const user = await database`
            select id, "firstName", "lastName", "dateOfBirth", "image", "membership", "level"
            from users
            where id = ${id}`
        return user[0]
    }
    catch(error) {
        return error
    }
}

async function editDetails(id, membership, level) {
    try {
        const updatedUser = await database`
            update users
            set membership = ${membership}, level = ${level}
            where id = ${id}
            returning *`
        return updatedUser[0]
    }
    catch(error) {
        return error
    }
}

async function getByName(firstName, lastName) {
    try {
        const users = await database`
            select id, "firstName", "lastName", "dateOfBirth", "image", "membership", "level"
            from users
            where LOWER("firstName") like LOWER(${'%' + firstName + '%'}) and LOWER("lastName") like LOWER(${'%' + lastName + '%'})`
        return users
    }
    catch(error) {
        return error
    }
}

async function getByPage(page, numberOfUsers) {
    try {
        const users = await database`
            select id, "firstName", "lastName", "dateOfBirth", "image", "membership", "level"
            from users
            offset ${(page - 1) * numberOfUsers} rows
            fetch first ${numberOfUsers} row only`
        return users
    }
    catch(error) {
        return error
    }
}

async function getByIds(ids) {
    try {
        const users = await database`
            select id, "firstName", "lastName", "dateOfBirth", "image", "membership", "level"
            from users
            where id = ANY(${ids})`
        return users
    }
    catch(error) {
        return error
    }
}

async function getTotalNumber() {
    try {
        const totalNumberOfUsers = await database`
            select CAST(count(*) AS INTEGER)
            from users`
        return totalNumberOfUsers[0].count
    }
    catch(error) {
        return error
    }
}

async function getByExpiringMemberships() {
    try {
        const expiringMembershipUsers = await database`
            select id, "firstName", "lastName", "dateOfBirth", "image", "membership", "level"
            from users
            where membership < ${new Date(Date.now() + 7*24*60*60*1000)}
            order by membership DESC`
        return expiringMembershipUsers
    }
    catch(error) {
        console.log(error)
        return error
    }
}

module.exports = {
    getById,
    editDetails,
    getByName,
    getByPage,
    getByIds,
    getTotalNumber,
    getByExpiringMemberships
}