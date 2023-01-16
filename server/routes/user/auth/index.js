const express = require('express')

const authController = require('../../../controllers/user/auth')
const generalController = require('../../../controllers/user/general')

const { registrationSchema, loginSchema } = require('./schemas')

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
    const newUser = await authController.addNew(req.body.firstName, req.body.lastName, new Date(req.body.dateOfBirth), req.body.image, req.body.username, req.body.password)
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

router.post('/login', async(req, res) => {
    const dataValidation = loginSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid login data')
        return
    }
    const user = await authController.getByUsername(req.body.username)
    const databaseConnection = await generalController.checkDatabaseConnection(user)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    if(!user) {
        res.status(400).json('Wrong login data')
        return
    }
    const passwordValidation = await authController.passwordValidation(req.body.password, user.password)
    if(!passwordValidation) {
        res.status(400).json('Wrong login data')
        return
    }
    const token = await authController.generateJWT(user.id, user.username)
    if(!token) {
        res.status(500).json('Error with creating JWT')
        return
    }
    res.setHeader('Authorization', token).status(200).json('User successfully logged in')
})

module.exports = router