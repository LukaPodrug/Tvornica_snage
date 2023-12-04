const express = require('express')

const promotionController = require('../../../controllers/user/promotion')
const generalController = require('../../../controllers/user/general')

const router = express.Router()

router.get('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const promotions = await promotionController.getAll()
    const databaseConnection = await generalController.checkDatabaseConnection(promotions)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    res.status(200).json(promotions)
})

module.exports = router