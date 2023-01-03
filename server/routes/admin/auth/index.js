const express = require('express')

const authController = require('../../../controllers/admin/auth')

const { registrationSchema } = require('./schemas')

const router = express.Router()

router.post('/registration', async(req, res) => {
    const validation = registrationSchema.validate(req.body)
    if(validation.error) {
        res.status(400).json('Invalid registration data')
        return
    }
    const user = await authController.checkUsername(req.body.username)
    if(user) {
        res.status(409).json('Username already in use')
        return
    }
    const admin = await authController.addNew(req.body)
    if(!admin) {
        res.status(500).json('Error with registering new admin')
        return
    }
    const token = await authController.generateJWT(admin.id, admin.username)
    res.setHeader('Authorization', token).status(200).json('Admin successfully registrated')
})

router.post('/login', async(req, res) => {

})

module.exports = router