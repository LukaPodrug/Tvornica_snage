const joiImport = require('joi')
const joiDate = require('@joi/date')

const joi = joiImport.extend(joiDate)

const newTrainingSchema = joi.object().keys({
    coach_id: joi.number().integer().min(0).required(),
    start: joi.date().format('YYYY-MM-DD HH:mm'),
    finish: joi.date().min(joi.ref('start')).format('YYYY-MM-DD HH:mm'),
    room: joi.number().integer().min(1).max(3).required(),
    capacity: joi.number().integer().min(1).required(),
    level: joi.number().integer().min(1).required(),
    description: joi.string().required()
})

const editTrainingSchema = joi.object().keys({
    id: joi.number().integer().min(0).required(),
    coach_id: joi.number().integer().min(0).required(),
    start: joi.date().format('YYYY-MM-DD HH:mm'),
    finish: joi.date().min(joi.ref('start')).format('YYYY-MM-DD HH:mm'),
    room: joi.number().integer().min(1).max(3).required(),
    capacity: joi.number().integer().min(1).required(),
    level: joi.number().integer().min(1).required(),
    description: joi.string().required()
})

const getTrainingsByDateSchema = joi.object().keys({
    date: joi.date().format('YYYY-MM-DD')
})

const deleteTrainingSchema = joi.object().keys({
    id: joi.number().integer().min(0).required()
})

module.exports = {
    newTrainingSchema,
    editTrainingSchema,
    getTrainingsByDateSchema,
    deleteTrainingSchema
}