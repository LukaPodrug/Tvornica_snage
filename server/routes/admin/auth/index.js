const express = require('express')

const authController = require('../../../controllers/admin/auth')
const coachController = require('../../../controllers/admin/coach')
const generalController = require('../../../controllers/admin/general')

const { registrationSchema, loginSchema } = require('./schemas')

const router = express.Router()

router.post('/registration', async(req, res) => {
    const dataValidation = registrationSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid registration data')
        return
    }
    const admin = await authController.getByUsername(req.body.username)
    const databaseConnection1 = await generalController.checkDatabaseConnection(admin)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(admin) {
        res.status(400).json('Username already in use')
        return
    }
    const newAdmin = await authController.addNew(req.body.firstName, req.body.lastName, new Date(req.body.dateOfBirth), req.body.image, req.body.username, req.body.password)
    const databaseConnection2 = await generalController.checkDatabaseConnection(newAdmin)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!newAdmin) {
        res.status(500).json('Error with registering new admin')
        return
    }
    const token = await authController.generateJWT(newAdmin.id, newAdmin.username)
    if(!token) {
        res.status(500).json('Error with creating JWT')
        return
    }
    res.setHeader('Authorization', token).status(200).json('Admin successfully registrated')
})

router.post('/login', async(req, res) => {
    const dataValidation = loginSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid login data')
        return
    }
    const admin = await authController.getByUsername(req.body.username)
    const databaseConnection = await generalController.checkDatabaseConnection(admin)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    if(!admin) {
        res.status(400).json('Wrong login data')
        return
    }
    const passwordValidation = await authController.passwordValidation(req.body.password, admin.password)
    if(!passwordValidation) {
        res.status(400).json('Wrong login data')
        return
    }
    const token = await authController.generateJWT(admin.id, admin.username)
    if(!token) {
        res.status(500).json('Error with creating JWT')
        return
    }
    res.setHeader('Authorization', token).status(200).json('Admin successfully logged in')
})

router.post('/verify', async(req, res) => {
    const token = req.header('Authorization')
    const tokenValidation = await generalController.verifyJWT(token)
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
    if(coach.length === 0) {
        res.status(400).json('JWT not valid')
        return
    }
    res.setHeader('Authorization', token).status(200).json('Admin successfully logged in')
})

module.exports = router