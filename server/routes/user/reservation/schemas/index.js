const joi = require('joi')

const newReservationSchema = joi.object().keys({
    trainingId: joi.number().integer().min(0).required()
})

const deleteReservationSchema = joi.object().keys({
    trainingId: joi.number().integer().min(0).required()
})

module.exports = {
    newReservationSchema,
    deleteReservationSchema
}