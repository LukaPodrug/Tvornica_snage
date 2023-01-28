const joiImport = require('joi')
const joiDate = require('@joi/date')

const joi = joiImport.extend(joiDate)

const editUserSchema = joi.object().keys({
    userId: joi.number().integer().min(0).required(),
    membership: joi.date().greater(Date.now() + 3600*1000*1).format('YYYY-MM-DD'),
    level: joi.number().integer().min(1).required()
})

const getUserByNameSchema = joi.object().keys({
    firstName: joi.string().required().allow(''),
    lastName: joi.string().required().allow('')
})

const getUsersByPageSchema = joi.object().keys({
    page: joi.number().integer().min(1).required(),
    numberOfUsers: joi.number().integer().min(1).required()
})

const getUsersByIdsSchema = joi.object().keys({
    ids: joi.array().items(joi.number().integer().min(0)).required()
})

module.exports = {
    editUserSchema,
    getUserByNameSchema,
    getUsersByPageSchema,
    getUsersByIdsSchema
}