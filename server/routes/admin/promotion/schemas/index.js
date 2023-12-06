const joi = require('joi')

const newPromotionSchema = joi.object().keys({
    partnerId: joi.number().integer().min(0).required(),
    code: joi.string().required(),
    description: joi.string().required().allow('')
})

const editPromotionSchema = joi.object().keys({
    id: joi.number().integer().min(0).required(),
    partnerId: joi.number().integer().min(0).required(),
    code: joi.string().required(),
    description: joi.string().required().allow('')
})

const deletePromotionSchema = joi.object().keys({
    id: joi.number().integer().min(0).required()
})

module.exports = {
    newPromotionSchema,
    editPromotionSchema,
    deletePromotionSchema
}