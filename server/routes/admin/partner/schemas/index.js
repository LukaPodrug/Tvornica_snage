const joi = require('joi')

const newPartnerSchema = joi.object().keys({
    name: joi.string().required(),
    link: joi.string().required()
})

const editPartnerSchema = joi.object().keys({
    id: joi.number().integer().min(0).required(),
    name: joi.string().required(),
    link: joi.string().required()
})

const deletePartnerSchema = joi.object().keys({
    id: joi.number().integer().min(0).required()
})

module.exports = {
    newPartnerSchema,
    editPartnerSchema,
    deletePartnerSchema
}