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

const getReservationsByTrainingIdSchema = joi.object().keys({
    trainingId: joi.number().integer().min(0).required()
})

const deleteReservationByTrainingIdAndUserId = joi.object().keys({
    trainingId: joi.number().integer().min(0).required(),
    userId: joi.number().integer().min(0).required()
})

module.exports = {
    newReservationSchema,
    editReservationSchema,
    getReservationsByTrainingIdSchema,
    deleteReservationByTrainingIdAndUserId
}