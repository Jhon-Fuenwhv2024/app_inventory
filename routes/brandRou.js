const { Router } = require('express');
const Brand = require('../models/Brand');
const { validationResult, check} = require('express-validator');
const {validateJwt} = require('../middleware/validar-jwt');
const {validateRoleAdmin} = require('../middleware/validar-rol-admin');

const router = Router();

// Create brand

router.post('/',[ validateJwt, validateRoleAdmin ],[
    check('name', 'the name is require').not().isEmpty(),
    check('status', 'The status is require').isIn(['Active', 'Inactive'])
], async function (req, res) {

    try {                                                                                                                                                                                                                                  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Error create brand'});
        }
    const  existBrand = await Brand.findOne({ name : req.body.name });

    if (existBrand) {
        return res.status(400).json({ 
            message: 'The brand already exist'});
    }

    let brand = new Brand();
    brand.name = req.body.name;
    brand.status = req.body.status;
    brand.created_at = new Date();
    brand.updated_at = new Date();

    brand = await brand.save();
    res.send(brand);
    console.log(brand);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error create brand'});
    }

});

// Brands list

router.get('/',[ validateJwt, validateRoleAdmin ], async function (req, res) {

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

router.put('/:brandId',[ validateJwt, validateRoleAdmin ],[
    check('name', 'the name is require').not().isEmpty(),
    check('status', 'The status is require').isIn(['Active', 'Inactive'])
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Error update brand', error: errors});
        }

        let brand = await Brand.findById(req.params.brandId);
        if (!brand) {
            return res.status(400).json({ 
                message: 'The brand does not exist'});
        }

    const existBrand = await Brand.findOne ({name : req.body.name, _id: { $ne: brand._id }});
    if (existBrand) {
        return res.status(400).json({ 
            message: 'The brand already exist'});
    }

    brand.name = req.body.name;
    brand.status = req.body.status;
    brand.updated_at = new Date();

    brand = await brand.save();
    res.send(brand);
    console.log(brand);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error update brand'});
    }

});

// DELETE Brand

router.delete('/:brandId',[ validateJwt, validateRoleAdmin ], async function (req, res) {

    try {
        const brand = await Brand.findById(req.params.brandId);
        if (!brand) {
            return res.status(400).json({ 
                message: 'The brand does not exist'});
        }

        brand = await Brand.finByIdAndDelete(req.params.brandId);
        res.send(brand);
        console.log(brand);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error delete brand'});
    }

});


module.exports = router;