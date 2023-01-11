const joi = require('joi')

const newReservationSchema = joi.object().keys({
    trainingId: joi.number().integer().min(0).required(),
    userId: joi.number().integer().min(0).required()
})

const editReservationSchema = joi.object().keys({
    trainingId: joi.number().integer().min(0).required(),
    userId: joi.number().integer().min(0).required(),
    completion: joi.boolean().required()
})

module.exports = {
    newReservationSchema,
    editReservationSchema
}