const express = require('express')

const partnerController = require('../../../controllers/admin/partner')
const promotionController = require('../../../controllers/admin/promotion')
const generalController = require('../../../controllers/admin/general')

const { newPartnerSchema, editPartnerSchema, deletePartnerSchema } = require('./schemas')

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

router.post('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = newPartnerSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid training data')
        return
    }
    const partner = await partnerController.getByName(req.body.name)
    const databaseConnection1 = await generalController.checkDatabaseConnection(partner)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(partner) {
        res.status(400).json('Partner already entered')
        return
    }
    const newPartner = await partnerController.addNew(req.body.name, req.body.link)
    const databaseConnection2 = await generalController.checkDatabaseConnection(newPartner)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!newPartner) {
        res.status(500).json('Error with adding new partner')
        return
    }
    res.status(200).json('New partner added successfully')
})

router.patch('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = editPartnerSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid partner data')
        return
    }
    const partner = await partnerController.getById(req.body.id)
    const databaseConnection1 = await generalController.checkDatabaseConnection(partner)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!partner) {
        res.status(400).json('Partner not found')
        return
    }
    if(req.body.name === partner.name && req.body.link === partner.link) {
        res.status(400).json('New partner data same as old')
        return
    }
    const updatedPartner = await partnerController.edit(req.body.id, req.body.name, req.body.link)
    const databaseConnection2 = await generalController.checkDatabaseConnection(updatedPartner)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!updatedPartner) {
        res.status(500).json('Error with editing partner')
        return
    }
    res.status(200).json('Partner successfully edited')
})

router.delete('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = deletePartnerSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid partner data')
        return
    }
    const partner = await partnerController.getById(req.body.id)
    const databaseConnection1 = await generalController.checkDatabaseConnection(partner)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!partner) {
        res.status(400).json('Partner does not exist')
        return
    }
    const deletedPromotions = await promotionController.removeByPartnerId(partner.id)
    const databaseConnection2 = await generalController.checkDatabaseConnection(deletedPromotions)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!deletedPromotions) {
        res.status(500).json('Error with deleting promotions')
        return
    }
    const deletedPartner = await partnerController.remove(req.body.id)
    const databaseConnection3 = await generalController.checkDatabaseConnection(deletedPartner)
    if(!databaseConnection3) {
        res.status(500).json('Error with database')
        return
    }
    if(!deletedPartner) {
        res.status(500).json('Error with deleting partner')
        return
    }
    res.status(200).json('Partner successfully deleted')
})

module.exports = router