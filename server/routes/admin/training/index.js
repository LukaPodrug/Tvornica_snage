const express = require('express')

const generalController = require('../../../controllers/admin/general')
const trainingController = require('../../../controllers/admin/training')

const { newTrainingSchema, editTrainingSchema } = require('./schemas')

const router = express.Router()

router.post('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(401).json('JWT not valid')
        return
    }
    const dataValidation = newTrainingSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid training data')
        return
    }
    const newTraining = await trainingController.addNew(req.body)
    if(!newTraining) {
        res.status(500).json('Error with adding new training')
        return
    }
    res.status(200).json('New training added successfully')
})

router.patch('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(401).json('JWT not valid')
        return
    }
    const dataValidation = editTrainingSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid training data')
        return
    }
    const training = await trainingController.getById(req.body.id)
    if(!training) {
        res.status(404).json('Training not found')
        return
    }
    const updatedTraining = await trainingController.editDetails(req.body)
    if(!updatedTraining) {
        res.status(500).json('Error with editing training details')
    }
    res.status(200).json('Training details successfully edited')
})

module.exports = router