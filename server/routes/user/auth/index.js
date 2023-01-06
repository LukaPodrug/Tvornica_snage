const express = require('express')

const authController = require('../../../controllers/user/auth')
const generalController = require('../../../controllers/user/general')

const { registrationSchema } = require('./schemas')

const router = express.Router()

router.post('/registration', async(req, res) => {
    const dataValidation = registrationSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid registration data')
        return
    }
    const user = await authController.getByUsername(req.body.username)
    const databaseConnection1 = await generalController.checkDatabaseConnection(user)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(user) {
        res.status(400).json('Username already in use')
        return
    }
    const newUser = await authController.addNew(req.body)
    const databaseConnection2 = await generalController.checkDatabaseConnection(newUser)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!newUser) {
        res.status(500).json('Error with registering new user')
        return
    }
    const token = await authController.generateJWT(newUser.id, newUser.username)
    if(!token) {
        res.status(500).json('Error with creating JWT')
        return
    }
    res.setHeader('Authorization', token).status(200).json('User successfully registrated')
})

module.exports = router