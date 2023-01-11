const express = require('express')

const userController = require('../../../controllers/admin/user')
const trainingController = require('../../../controllers/admin/training')
const reservationController = require('../../../controllers/admin/reservation')
const generalController = require('../../../controllers/admin/general')

const { newReservationSchema } = require('./schemas')

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

module.exports = router