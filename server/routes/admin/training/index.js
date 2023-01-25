const express = require('express')
const util = require('util')

const trainingController = require('../../../controllers/admin/training')
const reservationController = require('../../../controllers/admin/reservation')
const generalController = require('../../../controllers/admin/general')

const { newTrainingSchema, editTrainingSchema, getTrainingsByDateSchema, deleteTrainingSchema } = require('./schemas')

const router = express.Router()

router.post('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = newTrainingSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid training data')
        return
    }
    const roomOccupation = await trainingController.checkRoomOccupationNew(req.body.room, new Date(req.body.start), new Date(req.body.finish))
    const databaseConnection1 = await generalController.checkDatabaseConnection(roomOccupation)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(roomOccupation) {
        res.status(400).json('Room is occupied at that period')
        return
    }
    const newTraining = await trainingController.addNew(req.body.coachId, new Date(req.body.start), new Date(req.body.finish), req.body.room, req.body.capacity, req.body.level, req.body.title, req.body.regime, req.body.exercises)
    const databaseConnection2 = await generalController.checkDatabaseConnection(newTraining)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!newTraining) {
        res.status(500).json('Error with adding new training')
        return
    }
    res.status(200).json('New training added successfully')
})

router.patch('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = editTrainingSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid training data')
        return
    }
    const training = await trainingController.getById(req.body.id)
    const databaseConnection1 = await generalController.checkDatabaseConnection(training)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!training) {
        res.status(400).json('Training not found')
        return
    }
    if(req.body.coachId === training.coachId && new Date(req.body.start).getTime() === training.start.getTime() && new Date(req.body.finish).getTime() === training.finish.getTime() && req.body.room === training.room && req.body.capacity === training.capacity && req.body.level === training.level && req.body.title === training.title && req.body.regime === training.regime && req.body.exercises === training.exercises) {
        res.status(400).json('New training data same as old')
        return
    }
    const roomOccupation = await trainingController.checkRoomOccupationEdit(req.body.id ,req.body.room, new Date(req.body.start), new Date(req.body.finish))
    const databaseConnection2 = await generalController.checkDatabaseConnection(roomOccupation)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(roomOccupation) {
        res.status(400).json('Room is occupied at that period')
        return
    }
    const updatedTraining = await trainingController.editDetails(req.body.id, req.body.coachId, new Date(req.body.start), new Date(req.body.finish), req.body.room, req.body.capacity, req.body.level, req.body.title, req.body.regime, req.body.exercises)
    const databaseConnection3 = await generalController.checkDatabaseConnection(updatedTraining)
    if(!databaseConnection3) {
        res.status(500).json('Error with database')
        return
    }
    if(!updatedTraining) {
        res.status(500).json('Error with editing training details')
        return
    }
    res.status(200).json('Training details successfully edited')
})

router.get('/byDate', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = getTrainingsByDateSchema.validate(new Date(req.query.date))
    if(dataValidation.error) {
        res.status(400).json('Invalid date')
        return
    }
    const trainings = await trainingController.getByDate(new Date(req.query.date))
    const databaseConnection = await generalController.checkDatabaseConnection(trainings)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    res.status(200).json(trainings)
})

router.delete('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = deleteTrainingSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid training data')
        return
    }
    const training = await trainingController.getById(req.body.id)
    const databaseConnection1 = await generalController.checkDatabaseConnection(training)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!training) {
        res.status(400).json('Training does not exist')
        return
    }
    if(new Date(Date.now()) > training.start) {
        res.status(400).json('Can not delete training that already started')
        return
    }
    const deletedReservations = await reservationController.removeByTrainingId(req.body.id)
    const databaseConnection2 = await generalController.checkDatabaseConnection(deletedReservations)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!deletedReservations) {
        res.status(500).json('Error with deleting reservations')
        return
    }
    const deletedTraining = await trainingController.remove(req.body.id)
    const databaseConnection3 = await generalController.checkDatabaseConnection(deletedTraining)
    if(!databaseConnection3) {
        res.status(500).json('Error with database')
        return
    }
    if(!deletedTraining) {
        res.status(500).json('Error with deleting training')
        return
    }
    res.status(200).json('Training successfully deleted')
})

router.get('/own', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const trainings = await trainingController.getByCoachId(tokenValidation.id)
    const databaseConnection = await generalController.checkDatabaseConnection(trainings)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    res.status(200).json(trainings)
})

router.get('/ownByDate', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = getTrainingsByDateSchema.validate(new Date(req.query.date))
    if(dataValidation.error) {
        res.status(400).json('Invalid date')
        return
    }
    const trainings = await trainingController.getByCoachIdAndDate(tokenValidation.id, new Date(req.query.date))
    const databaseConnection = await generalController.checkDatabaseConnection(trainings)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    res.status(200).json(trainings)
})

module.exports = router