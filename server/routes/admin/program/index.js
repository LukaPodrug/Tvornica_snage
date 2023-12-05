const express = require('express')

const programController = require('../../../controllers/admin/program')
const generalController = require('../../../controllers/admin/general')

const { newProgramSchema, editProgramSchema } = require('./schemas')

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

router.post('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = newProgramSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid training data')
        return
    }
    const program = await programController.getByName(req.body.name)
    const databaseConnection1 = await generalController.checkDatabaseConnection(program)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(program) {
        res.status(400).json('Program name already in use')
        return
    }
    const newProgram = await programController.addNew(req.body.name, req.body.image)
    const databaseConnection2 = await generalController.checkDatabaseConnection(newProgram)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!newProgram) {
        res.status(500).json('Error with adding new program')
        return
    }
    res.status(200).json('New program added successfully')
})

router.patch('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = editProgramSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid program data')
        return
    }
    const program = await programController.getById(req.body.id)
    const databaseConnection1 = await generalController.checkDatabaseConnection(program)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!program) {
        res.status(400).json('Program not found')
        return
    }
    if(req.body.name === program.name && req.body.image === program.image) {
        res.status(400).json('New program data same as old')
        return
    }
    const updatedProgram = await programController.edit(req.body.id, req.body.name, req.body.image)
    const databaseConnection2 = await generalController.checkDatabaseConnection(updatedProgram)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!updatedProgram) {
        res.status(500).json('Error with editing program')
        return
    }
    res.status(200).json('Program successfully edited')
})

module.exports = router