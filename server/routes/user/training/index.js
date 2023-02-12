const express = require('express')

const trainingController = require('../../../controllers/user/training')
const userController = require('../../../controllers/user/user')
const generalController = require('../../../controllers/user/general')

const { getTrainingsByDateSchema } = require('./schemas')

const router = express.Router()

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
    const user = await userController.getById(tokenValidation.id)
    const databaseConnection1 = await generalController.checkDatabaseConnection(user)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    const trainings = await trainingController.getByDate(new Date(req.query.date), user.level)
    const databaseConnection2 = await generalController.checkDatabaseConnection(trainings)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    res.status(200).json(trainings)
})

module.exports = router