const express = require('express')

const generalController = require('../../../controllers/admin/general')
const trainingController = require('../../../controllers/admin/training')

const { trainingSchema } = require('./schemas')

const router = express.Router()

router.post('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(401).json('JWT not valid')
        return
    }
    const dataValidation = trainingSchema.validate(req.body)
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

module.exports = router