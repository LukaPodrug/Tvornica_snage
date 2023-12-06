const database = require('../../../database')

async function getAll() {
    try {
        const partners = await database`
            select id, name, link
            from partners`
        return partners
    }
    catch(error) {
        return error
    }
}

async function getByName(name) {
    try {
        const partner = await database`
            select *
            from partners
            where name = ${name}`
        return partner[0]
    }
    catch(error) {
        return error
    }
}

async function addNew(name, link) {
    try {
        const newPartner = await database`
            insert into partners (
                name, link
            ) 
            values (
                ${name}, ${link}
            )
            returning *`
        return newPartner[0]
    }
    catch(error) {
        return error
    }
}

async function edit(id, name, link) {
    try {
        const updatedPartner = await database`
            update partners
            set name = ${name}, link = ${link}
            where id = ${id}
            returning *`
        return updatedPartner[0]
    }
    catch(error) {
        return error
    }
}

async function getById(id) {
    try {
        const partner = await database`
            select *
            from partners
            where id = ${id}`
        return partner[0]
    }
    catch(error) {
        return error
    }
}

async function remove(id) {
    try {
        const removedPartner = await database`
            delete
            from partners
            where id = ${id}
            returning *`
        return removedPartner[0]
    }
    catch(error) {
        return error
    }
}

module.exports = {
    getAll,
    getByName,
    addNew,
    edit,
    getById,
    remove
}