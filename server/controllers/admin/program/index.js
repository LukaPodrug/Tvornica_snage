const database = require('../../../database')

async function getAll() {
    try {
        const programs = await database`
            select id, name, image
            from programs`
        return programs
    }
    catch(error) {
        return error
    }
}

async function getByName(name) {
    try {
        const program = await database`
            select *
            from programs
            where name = ${name}`
        return program[0]
    }
    catch(error) {
        return error
    }
}

async function addNew(name, image) {
    try {
        const newProgram = await database`
            insert into programs (
                name, image
            ) 
            values (
                ${name}, ${image}
            )
            returning *`
        return newProgram[0]
    }
    catch(error) {
        return error
    }
}

async function edit(id, name, image) {
    try {
        const updatedProgram = await database`
            update programs
            set name = ${name}, image = ${image}
            where id = ${id}
            returning *`
        return updatedProgram[0]
    }
    catch(error) {
        return error
    }
}

async function getById(id) {
    try {
        const program = await database`
            select *
            from programs
            where id = ${id}`
        return program[0]
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
    getById
}