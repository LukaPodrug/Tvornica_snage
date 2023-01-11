const joiImport = require('joi')
const joiDate = require('@joi/date')

const joi = joiImport.extend(joiDate)

const editUserSchema = joi.object().keys({
    userId: joi.number().integer().min(0).required(),
    membership: joi.date().greater(Date.now() + 3600*1000*1).format('YYYY-MM-DD'),
    level: joi.number().integer().min(1).required()
})

module.exports = {
    editUserSchema
}