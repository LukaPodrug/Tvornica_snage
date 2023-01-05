const express = require('express')

const trainingController = require('../../../controllers/admin/training')
const generalController = require('../../../controllers/admin/general')

const { newTrainingSchema, editTrainingSchema } = require('./schemas')

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
    const newTraining = await trainingController.addNew(req.body)
    const databaseConnection = await generalController.checkDatabaseConnection(newTraining)
    if(!databaseConnection) {
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
    const updatedTraining = await trainingController.editDetails(req.body)
    const databaseConnection2 = await generalController.checkDatabaseConnection(updatedTraining)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!updatedTraining) {
        res.status(500).json('Error with editing training details')
    }
    res.status(200).json('Training details successfully edited')
})

module.exports = router