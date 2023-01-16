const express = require('express')

const coachController = require('../../../controllers/admin/coach')
const generalController = require('../../../controllers/admin/general')

const router = express.Router()

router.get('/all', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const coaches = await coachController.getAll()
    const databaseConnection = await generalController.checkDatabaseConnection(coaches)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    res.status(200).json(coaches)
})

router.get('/own', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const coach = await coachController.getById(tokenValidation.id)
    const databaseConnection = await generalController.checkDatabaseConnection(coach)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    if(!coach) {
        res.status(400).json('Coach not found')
    }
    res.status(200).json(coach)
})

module.exports = router