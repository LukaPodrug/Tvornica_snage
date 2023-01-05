const joiImport = require('joi')
const joiDate = require('@joi/date')

const joi = joiImport.extend(joiDate)

const newTrainingSchema = joi.object().keys({
    coach_id: joi.number().integer().required(),
    start: joi.date().format('YYYY-MM-DD HH:mm'),
    finish: joi.date().format('YYYY-MM-DD HH:mm'),
    room: joi.number().integer().required(),
    capacity: joi.number().integer().required(),
    level: joi.number().integer().required(),
    description: joi.string().required()
})

const editTrainingSchema = joi.object().keys({
    id: joi.number().integer().required(),
    coach_id: joi.number().integer().required(),
    start: joi.date().format('YYYY-MM-DD HH:mm'),
    finish: joi.date().format('YYYY-MM-DD HH:mm'),
    room: joi.number().integer().required(),
    capacity: joi.number().integer().required(),
    level: joi.number().integer().required(),
    description: joi.string().required()
})

module.exports = {
    newTrainingSchema,
    editTrainingSchema
}