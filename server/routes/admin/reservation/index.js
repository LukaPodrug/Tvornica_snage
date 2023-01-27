const express = require('express')

const userController = require('../../../controllers/admin/user')
const trainingController = require('../../../controllers/admin/training')
const reservationController = require('../../../controllers/admin/reservation')
const generalController = require('../../../controllers/admin/general')

const { newReservationSchema, editReservationSchema, getReservationsByTrainingIdSchema, deleteReservationByTrainingIdAndUserId } = require('./schemas')

const router = express.Router()

router.post('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = newReservationSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid reservation data')
        return
    }
    const user = await userController.getById(req.body.userId)
    const databaseConnection1 = await generalController.checkDatabaseConnection(user)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!user) {
        res.status(400).json('User not found')
        return
    }
    const training = await trainingController.getById(req.body.trainingId)
    const databaseConnection2 = await generalController.checkDatabaseConnection(training)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!training) {
        res.status(400).json('Training not found')
        return
    }
    const reservation = await reservationController.getByUserIdAndTrainingId(req.body.userId, req.body.trainingId)
    const databaseConnection3 = await generalController.checkDatabaseConnection(reservation)
    if(!databaseConnection3) {
        res.status(500).json('Error with database')
        return
    }
    if(reservation) {
        res.status(400).json('Reservation already exists')
        return
    }
    const newReservation = await reservationController.addNew(req.body.userId, req.body.trainingId)
    const databaseConnection4 = await generalController.checkDatabaseConnection(newReservation)
    if(!databaseConnection4) {
        res.status(500).json('Error with database')
        return
    }
    if(!newReservation) {
        res.status(500).json('Error with adding reservation')
        return
    }
    res.status(200).json('Reservation added successfully')
})

router.patch('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = editReservationSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid reservation data')
        return
    }
    const reservation = await reservationController.getByUserIdAndTrainingId(req.body.userId, req.body.trainingId)
    const databaseConnection1 = await generalController.checkDatabaseConnection(reservation)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!reservation) {
        res.status(400).json('Reservation not found')
        return
    }
    if(reservation.completion === req.body.completion) {
        res.status(400).json('Old reservation completion same as new')
        return
    }
    const updatedReservation = await reservationController.editCompletion(req.body.userId, req.body.trainingId, req.body.completion)
    const databaseConnection2 = await generalController.checkDatabaseConnection(updatedReservation)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!updatedReservation) {
        res.status(500).json('Error with updating reservation completion')
        return
    }
    res.status(200).json('Reservation completion updated successfully')
})

router.get('/byTrainingId', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = getReservationsByTrainingIdSchema.validate(req.query)
    if(dataValidation.error) {
        res.status(400).json('Invalid training id')
        return
    }
    const training = await trainingController.getById(req.query.trainingId)
    const databaseConnection1 = await generalController.checkDatabaseConnection(training)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!training) {
        res.status(400).json('Training not found')
        return
    }
    const reservations = await reservationController.getByTrainingId(req.query.trainingId)
    const databaseConnection2 = await generalController.checkDatabaseConnection(reservations)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    reservations.forEach(reservation => {
        delete reservation.username
        delete reservation.password
    })
    res.status(200).json(reservations)
})

router.delete('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = deleteReservationByTrainingIdAndUserId.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid delete reservation data')
        return
    }
    const reservation = await reservationController.getByUserIdAndTrainingId(req.body.userId, req.body.trainingId)
    const databaseConnection1 = await generalController.checkDatabaseConnection(reservation)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!reservation) {
        res.status(400).json('Reservation not found')
        return
    }
    if(!reservation.manual) {
        res.status(400).json('Can not remove user entered reservation')
        return
    }
    const removedReservation = await reservationController.removeByUserIdAndTrainingId(req.body.userId, req.body.trainingId)
    const databaseConnection2 = await generalController.checkDatabaseConnection(removedReservation)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!removedReservation) {
        res.status(500).json('Error with removing reservation')
    }
    res.status(200).json('Reservation successfully removed')
})

module.exports = router