const express = require('express')

const userController = require('../../../controllers/admin/user')
const generalController = require('../../../controllers/admin/general')

const { editUserSchema, getUserByNameSchema, getUsersByPageSchema, getUsersByIdsSchema } = require('./schemas')

const router = express.Router()

router.patch('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = editUserSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid user data')
        return
    }
    const user = await userController.getById(req.body.userId)
    const databaseConnection1 = await generalController.checkDatabaseConnection(user)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!user) {
        res.status(400).json('User does not exist')
        return
    }
    if(user.membership > new Date(req.body.membership)) {
        res.status(400).json('Old memebership is longer than new')
        return
    }
    const updatedUser = await userController.editDetails(req.body.userId, new Date(req.body.membership), req.body.level)
    const databaseConnection2 = await generalController.checkDatabaseConnection(updatedUser)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!updatedUser) {
        res.status(500).json('Error with updating user details')
        return
    }
    res.status(200).json('User level and membership successfully updated')
})

router.get('/byName', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const searchFilter = {
        firstName: req.query.firstName,
        lastName: req.query.lastName
    }
    const dataValidation = getUserByNameSchema.validate(searchFilter)
    if(dataValidation.error) {
        res.status(400).json('Invalid name')
        return
    }
    const users = await userController.getByName(searchFilter.firstName, searchFilter.lastName)
    const databaseConnection = await generalController.checkDatabaseConnection(users)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    res.status(200).json(users)
})

router.get('/byPage', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const searchFilter = {
        page: parseInt(req.query.page)
    }
    const dataValidation = getUsersByPageSchema.validate(searchFilter)
    if(dataValidation.error) {
        res.status(400).json('Invalid page')
        return
    }
    const users = await userController.getByPage(req.query.page)
    const databaseConnection = await generalController.checkDatabaseConnection(users)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    res.status(200).json(users)
})

router.get('/byIds', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const searchFilter = {
        ids: JSON.parse(req.query.ids)
    }
    const dataValidation = getUsersByIdsSchema.validate(searchFilter)
    if(dataValidation.error) {
        res.status(400).json('Invalid array of ids')
        return
    }
    const users = await userController.getByIds(JSON.parse(req.query.ids))
    const databaseConnection = await generalController.checkDatabaseConnection(users)
    if(!databaseConnection) {
        res.status(500).json('Error with database')
        return
    }
    res.status(200).json(users)
})

module.exports = router