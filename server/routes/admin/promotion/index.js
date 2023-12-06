const express = require('express')

const promotionController = require('../../../controllers/admin/promotion')
const generalController = require('../../../controllers/admin/general')

const { newPromotionSchema, editPromotionSchema, deletePromotionSchema } = require('./schemas')

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

router.post('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = newPromotionSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid promotion data')
        return
    }
    const promotion = await promotionController.getByPartnerIdAndCode(req.body.partnerId, req.body.code)
    const databaseConnection1 = await generalController.checkDatabaseConnection(promotion)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(promotion) {
        res.status(400).json('Promotion already exists')
        return
    }
    const newPromotion = await promotionController.addNew(req.body.partnerId, req.body.code, req.body.description)
    const databaseConnection2 = await generalController.checkDatabaseConnection(newPromotion)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!newPromotion) {
        res.status(500).json('Error with adding new promotion')
        return
    }
    res.status(200).json('New promotion added successfully')
})

router.patch('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = editPromotionSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid promotion data')
        return
    }
    const promotion = await promotionController.getById(req.body.id)
    const databaseConnection1 = await generalController.checkDatabaseConnection(promotion)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!promotion) {
        res.status(400).json('Promotion not found')
        return
    }
    if(req.body.partnerId === promotion.partnerId && req.body.code === promotion.code && req.body.description === promotion.description) {
        res.status(400).json('New promotion data same as old')
        return
    }
    const updatedPromotion = await promotionController.edit(req.body.id, req.body.partnerId, req.body.code, req.body.description)
    const databaseConnection2 = await generalController.checkDatabaseConnection(updatedPromotion)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!updatedPromotion) {
        res.status(500).json('Error with editing promotion')
        return
    }
    res.status(200).json('Promotion successfully edited')
})

router.delete('/', async(req, res) => {
    const tokenValidation = await generalController.verifyJWT(req.header('Authorization'))
    if(!tokenValidation) {
        res.status(400).json('JWT not valid')
        return
    }
    const dataValidation = deletePromotionSchema.validate(req.body)
    if(dataValidation.error) {
        res.status(400).json('Invalid promotion data')
        return
    }
    const promotion = await promotionController.getById(req.body.id)
    const databaseConnection1 = await generalController.checkDatabaseConnection(promotion)
    if(!databaseConnection1) {
        res.status(500).json('Error with database')
        return
    }
    if(!promotion) {
        res.status(400).json('Promotion does not exist')
        return
    }
    const deletedPromotion = await promotionController.remove(req.body.id)
    const databaseConnection2 = await generalController.checkDatabaseConnection(deletedPromotion)
    if(!databaseConnection2) {
        res.status(500).json('Error with database')
        return
    }
    if(!deletedPromotion) {
        res.status(500).json('Error with deleting promotion')
        return
    }
    res.status(200).json('Promotion successfully deleted')
})

module.exports = router