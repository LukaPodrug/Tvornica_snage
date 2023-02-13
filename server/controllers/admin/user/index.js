const database = require('../../../database')

async function getById(id) {
    try {
        const user = await database`
            select id, "firstName", "lastName", "dateOfBirth", image, membership, level
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
            select id, "firstName", "lastName", "dateOfBirth", image, membership, level
            from users
            where LOWER("firstName") like LOWER(${'%' + firstName + '%'}) and LOWER("lastName") like LOWER(${'%' + lastName + '%'})
            order by id`
        return users
    }
    catch(error) {
        return error
    }
}

async function getByPage(page, numberOfUsers) {
    try {
        const users = await database`
            select id, "firstName", "lastName", "dateOfBirth", image, membership, level
            from users
            order by id
            offset ${(page - 1) * numberOfUsers} rows
            fetch next ${numberOfUsers} row only`
        return users
    }
    catch(error) {
        return error
    }
}

async function getByIds(ids) {
    try {
        const users = await database`
            select id, "firstName", "lastName", "dateOfBirth", image, membership, level
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
            select id, "firstName", "lastName", "dateOfBirth", image, membership, level
            from users
            where membership < ${new Date(Date.now() + 7*24*60*60*1000)}
            order by membership DESC`
        return expiringMembershipUsers
    }
    catch(error) {
        return error
    }
}

async function getByBirthdays() {
    try {
        const birthdayUsers = await database`
            select id, "firstName", "lastName", "dateOfBirth", image, membership, level
            from users
            where date_part('day', "dateOfBirth") = date_part('day', CURRENT_DATE + INTERVAL '1day') and date_part('month', "dateOfBirth") = date_part('month', CURRENT_DATE + INTERVAL '1day')`
        return birthdayUsers
    }
    catch(error) {
        return error
    }
}

async function getByAwards() {
    try {
        const awardsUsers = await database`
            select
            cast(sum(case when completion = true and manual = false then 1 else 0 end) as integer) as "reservationsDone",
            cast(sum(case when completion = false and manual = false then 1 else 0 end) as integer) as "reservationsSkipped",
            cast(sum(case when completion = true and manual = true then 1 else 0 end) as integer) as "nonReservationsDone",
            reservations."userId", users.image, users."firstName", users."lastName", users."dateOfBirth", users.membership, users.level
            from reservations 
            join trainings on reservations."trainingId" = trainings.id 
            join users on reservations."userId" = users.id
            where trainings.start > ${new Date(Date.now() - 30*24*60*60*1000)} and trainings.finish < ${new Date(Date.now())}
            group by reservations."userId", users.image, users."firstName", users."lastName", users."dateOfBirth", users.membership, users.level
            order by "reservationsDone" DESC, "reservationsSkipped" ASC, "nonReservationsDone" DESC
            limit 6`
        return awardsUsers
    }
    catch(error) {
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
    getByExpiringMemberships,
    getByBirthdays,
    getByAwards
}