const express = require('express')

const reservationController = require('../../../controllers/user/reservation')
const trainingController = require('../../../controllers/user/training')
const userController = require('../../../controllers/user/user')
const generalController = require('../../../controllers/user/general')

const { newReservationSchema, deleteReservationSchema } = require('./schemas')

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
    const training = await trainingController.getById(req.body.trainingId)
    const databaseConnection1 = await generalController.checkDatabaseConnection(training)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!training) {
        res.status(400).json('Training does not exist')
        return
    }
    if(new Date(Date.now()) >= training.start) {
        res.status(400).json('Training already started')
        return
    }
    const reservation = await reservationController.getByUserIdAndTrainingId(tokenValidation.id, req.body.trainingId)
    const databaseConnection2 = await generalController.checkDatabaseConnection(reservation)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(reservation) {
        res.status(400).json('Reservation already entered')
        return
    }
    const user = await userController.getById(tokenValidation.id)
    const databaseConnection3 = await generalController.checkDatabaseConnection(user)
    if(!databaseConnection3) {
        res.status(500).json('Error with database')
        return
    }
    if(new Date(user.membership.getTime() + 3600*1000*24*7) < training.start) {
        res.status(400).json('Membership expired for this training')
        return
    }
    if(user.level < training.level) {
        res.status(400).json('Level not high enough for this training')
        return
    }
    const newReservation = await reservationController.addNew(tokenValidation.id, req.body.trainingId)
    const databaseConnection4 = await generalController.checkDatabaseConnection(newReservation)
    if(!databaseConnection4) {
        res.status(500).json('Error with database')
        return
    }
    if(!newReservation) {
        res.status(500).json('Error with adding new reservation')
        return
    }
    res.status(200).json('New reservation added successfully')
})

router.delete('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = deleteReservationSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid reservation data')
        return
    }
    const reservation = await reservationController.getByUserIdAndTrainingId(tokenValidation.id, req.body.trainingId)
    const databaseConnection1 = await generalController.checkDatabaseConnection(reservation)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!reservation) {
        res.status(400).json('Reservation does not exist')
        return
    }
    const training = await trainingController.getById(req.body.trainingId)
    const databaseConnection2 = await generalController.checkDatabaseConnection(training)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!training) {
        res.status(400).json('Training does not exist')
        return
    }
    if(new Date(Date.now()) >= training.start) {
        res.status(400).json('Training already started')
        return
    }
    const removedReservation = await reservationController.remove(tokenValidation.id, req.body.trainingId)
    const databaseConnection3 = await generalController.checkDatabaseConnection(removedReservation)
    if(!databaseConnection3) {
        res.status(500).json('Error with database')
        return
    }
    if(!removedReservation) {
        res.status(400).json('Reservation not removed')
        return
    }
    res.status(200).json('Reservation successfully removed')
})

router.get('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const reservations = await reservationController.getActiveByUserId(tokenValidation.id)
    const databaseConnection = await generalController.checkDatabaseConnection(reservations)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    res.status(200).json(reservations)
})

module.exports = router