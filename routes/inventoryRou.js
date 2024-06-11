const { Router } = require('express');
const Inventory = require('../models/Inventory');
const { validationResult, check} = require('express-validator');

const router = Router();

// Create Inventory

router.post('/',[
    check('serial', 'the serial is require').not().isEmpty(),
    check('model', 'the model is require').not().isEmpty(),
    check('description', 'the description is require').not().isEmpty(),
    check('equipmentPhoto', 'the equipmentPhoto is require').not().isEmpty(),
    check('color', 'the color is require').not().isEmpty(),
    check('daybuy', 'the daybuy is require').not().isEmpty(),
    check('price', 'the price is require').not().isEmpty(),


    check('userRole', 'the userRole is require').not().isEmpty(),
    check('brandDefined', 'The brandDefined is require').not().isEmpty(),
    check('statusEquipmentDefined', 'The statusEquipmentDefined is require').not().isEmpty(),
    chech('typeEquipmentDefined', 'The typeEquipmentDefined is require').not().isEmpty()
], async function (req, res) {

    try {                                                                                                                                                                                                                                  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Error create inventory'});
        }
    const  existSerialInventory = await Inventory.findOne({ serial : req.body.serial });

    if (existSerialInventory) {
        return res.status(400).json({ 
            message: 'The serial the inventory already exist'});
    }

    let inventory = new Inventory();
    inventory.serial = req.body.serial;
    inventory.model = req.body.model;
    inventory.description = req.body.description;
    inventory.equipmentPhoto = req.body.equipmentPhoto;
    inventory.color = req.body.color;
    inventory.daybuy = req.body.daybuy;
    inventory.price = req.body.price;
    inventory.userRole = req.body.userRole._id;
    inventory.brandDefined = req.body.brandDefined._id;
    inventory.statusEquipmentDefined = req.body.statusEquipmentDefined._id;
    inventory.type = req.body.typeEquipmentDefined._id;
    inventory.created_at = new Date();
    inventory.updated_at = new Date();

    inventory = await inventory.save();
    res.send(inventory);
    console.log(inventory);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error create inventory'});
    }

});

// Brands list

router.get('/', async function (req, res) {

    try {
        const brands = await Brand.find();
        res.send(brands);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error get brands'});
    }
});

// PUT Brand

router.put('/:id',[
    check('name', 'the name is require').not().isEmpty(),
    check('status', 'The status is require').isIn(['Active', 'Inactive'])
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Error update inventory'});
        }

        let inventory = await Brand.findById(req.params.brandId);
        if (!inventory) {
            return res.status(400).json({ 
                message: 'The inventory does not exist'});
        }

    const existBrand = await Brand.findOne ({name : req.body.name, _id: { $ne: inventory._id }});
    if (existBrand) {
        return res.status(400).json({ 
            message: 'The inventory already exist'});
    }

    inventory.name = req.body.name;
    inventory.status = req.body.status;
    inventory.updated_at = new Date();

    inventory = await inventory.save();
    res.send(inventory);
    console.log(inventory);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error update inventory'});
    }

});

// DELETE Brand

router.delete('/:brandId', async function (req, res) {

    try {
        const inventory = await Brand.findById(req.params.brandId);
        if (!inventory) {
            return res.status(400).json({ 
                message: 'The inventory does not exist'});
        }

        inventory = await Brand.finByIdAndDelete(req.params.brandId);
        res.send(inventory);
        console.log(inventory);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error delete inventory'});
    }

});


module.exports = router;