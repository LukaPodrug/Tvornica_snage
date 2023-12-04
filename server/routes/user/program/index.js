const express = require('express')

const programController = require('../../../controllers/user/program')
const generalController = require('../../../controllers/user/general')

const router = express.Router()

router.get('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const programs = await programController.getAll()
    const databaseConnection = await generalController.checkDatabaseConnection(programs)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    res.status(200).json(programs)
})

module.exports = router