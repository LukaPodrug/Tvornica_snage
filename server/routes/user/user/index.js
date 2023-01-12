const express = require('express')

const userController = require('../../../controllers/user/user')
const generalController = require('../../../controllers/user/general')

const router = express.Router()

router.get('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const user = await userController.getById(tokenValidation.id)
    const databaseConnection = await generalController.checkDatabaseConnection(user)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    if(!user) {
        res.status(400).json('User not found')
    }
    res.status(200).json(user)
})

module.exports = router