const joiImport = require('joi')
const joiDate = require('@joi/date')

const joi = joiImport.extend(joiDate)

const registrationSchema = joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    dateOfBirth: joi.date().format('YYYY-MM-DD').allow('').required(),
    image: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required()
})

const loginSchema = joi.object().keys({
    username: joi.string().required(),
    password: joi.string().required()
})

module.exports = {
    registrationSchema,
    loginSchema
}