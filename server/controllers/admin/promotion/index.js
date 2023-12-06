const database = require('../../../database')

async function removeByPartnerId(partnerId) {
    try {
        const removedPromotions = await database`
            delete
            from promotions
            where "partnerId" = ${partnerId}
            returning *`
        return removedPromotions
    }
    catch(error) {
        return error
    }
}

async function getAll() {
    try {
        const promotions = await database`
            select id, "partnerId", code, description
            from promotions`
        return promotions
    }
    catch(error) {
        return error
    }
}

async function getByPartnerIdAndCode(partnerId, code) {
    try {
        const promotion = await database`
            select *
            from promotions
            where "partnerId" = ${partnerId} and code = ${code}`
        return promotion[0]
    }
    catch(error) {
        return error
    }
}

async function addNew(partnerId, code, description) {
    try {
        const newPromotion = await database`
            insert into promotions (
                "partnerId", code, description
            ) 
            values (
                ${partnerId}, ${code}, ${description}
            )
            returning *`
        return newPromotion[0]
    }
    catch(error) {
        return error
    }
}

async function edit(id, partnerId, code, description) {
    try {
        const updatedPromotion = await database`
            update promotions
            set "partnerId" = ${partnerId}, code = ${code}, description = ${description}
            where id = ${id}
            returning *`
        return updatedPromotion[0]
    }
    catch(error) {
        return error
    }
}

async function getById(id) {
    try {
        const promotion = await database`
            select *
            from promotions
            where id = ${id}`
        return promotion[0]
    }
    catch(error) {
        return error
    }
}

async function remove(id) {
    try {
        const removedPromotion = await database`
            delete
            from promotions
            where id = ${id}
            returning *`
        return removedPromotion[0]
    }
    catch(error) {
        return error
    }
}

module.exports = {
    removeByPartnerId,
    getAll,
    getByPartnerIdAndCode,
    addNew,
    edit,
    getById,
    remove
}