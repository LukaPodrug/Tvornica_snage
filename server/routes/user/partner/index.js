const express = require('express')

const partnerController = require('../../../controllers/user/partner')
const generalController = require('../../../controllers/user/general')

const router = express.Router()

router.get('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const partners = await partnerController.getAll()
    const databaseConnection = await generalController.checkDatabaseConnection(partners)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    res.status(200).json(partners)
})

module.exports = router