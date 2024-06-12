const { Router } = require('express');
const TypeEquipment = require('../models/TypeEquipment');
const { validationResult, check} = require('express-validator');

const router = Router();

// Create typeEquipment

router.post('/',[
    check('name', 'the name is require').not().isEmpty(),
    check('status', 'The status is require').isIn(['Active', 'Inactive'])
], async function (req, res) {

    try {                                                                                                                                                                                                                                  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Error create TypeEquipment', error: errors});
        }
    const  existTypeEquipment = await TypeEquipment.findOne({ name : req.body.name });

    if (existTypeEquipment) {
        return res.status(400).json({ 
            message: 'The typeEquipment already exist'});
    }

    let typeEquipment = new TypeEquipment();
    typeEquipment.name = req.body.name;
    typeEquipment.status = req.body.status;
    typeEquipment.created_at = new Date();
    typeEquipment.updated_at = new Date();

    typeEquipment = await typeEquipment.save();
    res.send(typeEquipment);
    console.log(typeEquipment);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error create typeEquipment'});
    }

});

// TypeEquipment list

router.get('/', async function (req, res) {

    try {
        const typeEquipment = await TypeEquipment.find();
        res.send(typeEquipment);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error get typeEquipment'});
    }
});

// PUT TypeEquipment

router.put('/:typeEquipmentId',[
    check('name', 'the name is require').not().isEmpty(),
    check('status', 'The status is require').isIn(['Active', 'Inactive'])
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Error update typeEquipment', errors: errors});
        }

        let typeEquipment = await TypeEquipment.findById(req.params.typeEquipmentId);
        if (!typeEquipment) {
            return res.status(400).json({ 
                message: 'The typeEquipment does not exist', error: errors});
        }

    const existTypeEquipment = await TypeEquipment.findOne ({name : req.body.name, _id: { $ne: typeEquipment._id }});
    if (existTypeEquipment) {
        return res.status(400).json({ 
            message: 'The typeEquipment already exist'});
    }

    typeEquipment.name = req.body.name;
    typeEquipment.status = req.body.status;
    typeEquipment.updated_at = new Date();

    typeEquipment = await typeEquipment.save();
    res.send(typeEquipment);
    console.log(typeEquipment);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error update typeEquipment'});
    }

});

// DELETE TypeEquipment

router.delete('/:typeEquipmentId', async function (req, res) {

    try {
        const typeEquipment = await TypeEquipment.findById(req.params.typeEquipmentId);
        if (!typeEquipment) {
            return res.status(400).json({ 
                message: 'The typeEquipment does not exist'});
        }

        typeEquipment = await TypeEquipment.finByIdAndDelete(req.params.typeEquipmentId);
        res.send(typeEquipment);
        console.log(typeEquipment);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error delete typeEquipment'});
    }

});


module.exports = router;