const joiImport = require('joi')
const joiDate = require('@joi/date')

const joi = joiImport.extend(joiDate)

const getTrainingsByDateSchema = joi.object().keys({
    date: joi.date().format('YYYY-MM-DD')
})

module.exports = {
    getTrainingsByDateSchema
}