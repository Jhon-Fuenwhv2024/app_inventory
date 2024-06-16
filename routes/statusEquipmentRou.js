const { Router } = require('express');
const StatusEquipment = require('../models/StatusEquipment');
const { validationResult, check} = require('express-validator');
const { status } = require('server/reply');
const {validateJwt} = require('../middleware/validar-jwt');
const {validateRoleAdmin} = require('../middleware/validar-rol-admin');

const router = Router();

// Create a new StatusEquipment

router.post('/',[ validateJwt, validateRoleAdmin ],[
    check('name', 'The name is require').not().isEmpty(),
    check('status', 'The status is required').isIn(['Active', 'Inactive'])
], async function (req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Error creating new StatusEquipment'});
        }
    const existiStatusEquipment = await StatusEquipment.findOne({ name: req.body.name });

    if (existiStatusEquipment) {
        return res.status(400).json({ 
            message: 'StatusEquipment already exists'});
    }

    let statusEquipment = new StatusEquipment();
    statusEquipment.name = req.body.name;
    statusEquipment.status = req.body.status;
    statusEquipment.created_at = new Date();
    statusEquipment.updated_at = new Date();

    statusEquipment = await statusEquipment.save();
    res.status(201).json({
        message: 'StatusEquipment created successfully',
        statusEquipment
    });

    }catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Error creating new StatusEquipment'
        });
    }
});

// Get StatusEquipment

router.get('/',[ validateJwt, validateRoleAdmin ], async function (req, res) {

    try {
        const statusEquipments = await StatusEquipment.find();
        res.send(statusEquipments);


    }catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Error getting StatusEquipments'
        });
    }
});

// Put statusEquipment

router.put('/:statusEquipmentId',[ validateJwt, validateRoleAdmin ], [
    check('name', 'The name is require').not().isEmpty(),
    check('status', 'The status is required').isIn(['Active', 'Inactive'])
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Error creating new StatusEquipment'});
        }

        let statusEquipment = await StatusEquipment.findById(req.params.statusEquipmentId);
        if (!statusEquipment) {

            return res.status(404).json({ 
                message: 'StatusEquipment not found', error: errors});
        }

    const existStatusEquipment = await StatusEquipment.findOne ({ name: req.body.name, _id: { $ne: statusEquipment._id}});
    if (existStatusEquipment) {
        return res.status(400).json({ 
            message: 'StatusEquipment already exists' });
    }

    statusEquipment.name = req.body.name;
    statusEquipment.status = req.body.status;
    statusEquipment.updated_at = new Date();

    }catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error updating StatusEquipment', error: error
        });

    }
});

// Delete StatusEquipment

router.delete('/:statusEquipmentId',[ validateJwt, validateRoleAdmin ], async function (req, res) {

    try {
        const statusEquipment = await StatusEquipment.findById(req.params.statusEquipmentId);
        if (!statusEquipment) {
            return res.status(404).json({ 
                message: 'StatusEquipment not found'});
        }

        statusEquipment = await StatusEquipment.findByIdAndDelete(req.params.statusEquipmentId);
        res.send(statusEquipment);
        res.status(200).json({
            message: 'StatusEquipment deleted successfully'
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error deleting StatusEquipment'
        });

    }
});

module.exports = router;