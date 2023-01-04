const express = require('express')

const authController = require('../../../controllers/admin/auth')

const { registrationSchema, loginSchema } = require('./schemas')

const router = express.Router()

router.post('/registration', async(req, res) => {
    const dataValidation = registrationSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid registration data')
        return
    }
    const admin = await authController.getByUsername(req.body.username)
    if(admin) {
        res.status(409).json('Username already in use')
        return
    }
    const newAdmin = await authController.addNew(req.body)
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

module.exports = router