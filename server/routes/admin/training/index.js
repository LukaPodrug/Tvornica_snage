const express = require('express')

const trainingController = require('../../../controllers/admin/training')
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
    const roomOccupation = await trainingController.checkRoomOccupationNew(req.body.room, req.body.start, req.body.finish)
    const databaseConnection1 = await generalController.checkDatabaseConnection(roomOccupation)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(roomOccupation) {
        res.status(400).json('Room is occupied at that period')
        return
    }
    const newTraining = await trainingController.addNew(req.body)
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
    const roomOccupation = await trainingController.checkRoomOccupationEdit(req.body.id ,req.body.room, req.body.start, req.body.finish)
    const databaseConnection2 = await generalController.checkDatabaseConnection(roomOccupation)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(roomOccupation) {
        res.status(400).json('Room is occupied at that period')
        return
    }
    const updatedTraining = await trainingController.editDetails(req.body)
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
    const trainings = await trainingController.getByDate(req.query.date)
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
        res.status(400).json('Invalid date')
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
    }
    const deletedTraining = await trainingController.remove(req.body.id)
    const databaseConnection2 = await generalController.checkDatabaseConnection(deletedTraining)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!deletedTraining) {
        res.status(400).json('Training not found')
        return
    }
    res.status(200).json('Training successfully deleted')
})

module.exports = router