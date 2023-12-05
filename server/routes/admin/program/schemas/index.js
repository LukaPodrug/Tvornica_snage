const joi = require('joi')

const newProgramSchema = joi.object().keys({
    name: joi.string().required(),
    image: joi.string().required()
})

const editProgramSchema = joi.object().keys({
    id: joi.number().integer().min(0).required(),
    name: joi.string().required(),
    image: joi.string().required()
})

module.exports = {
    newProgramSchema,
    editProgramSchema
}