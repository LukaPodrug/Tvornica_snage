const joiImport = require('joi')
const joiDate = require('@joi/date')

const joi = joiImport.extend(joiDate)

const trainingSchema = joi.object().keys({
    coach_id: joi.number().integer().required(),
    start: joi.date().format('YYYY-MM-DD HH:mm'),
    finish: joi.date().format('YYYY-MM-DD HH:mm'),
    room: joi.number().integer().required(),
    capacity: joi.number().integer().required(),
    level: joi.number().integer().required(),
    description: joi.string().required()
})

module.exports = {
    trainingSchema
}