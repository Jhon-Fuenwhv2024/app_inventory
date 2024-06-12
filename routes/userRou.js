const { Router } = require('express');
const User = require('../models/User');
const { validationResult, check} = require('express-validator');
const bycript = require('bcryptjs')

const router = Router();

// Create user

router.post('/',[
    check('name', 'the name is require').not().isEmpty(),
    check('email', 'the email is require').not().isEmpty(),
    check('status', 'The status is require').isIn(['Active', 'Inactive']),
    check('password', 'the password is require').not().isEmpty(),
    check('role', 'the role is require').isIn(['Admin','Teacher']),
], async function (req, res) {

    try {                                                                                                                                                                                                                                  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Error create User', error: errors});
        }
    const  existUser= await User.findOne({ name : req.body.name });

    if (existUser) {
        return res.status(400).json({ 
            message: 'The User already exist'});
    }

    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.status = req.body.status;

    const salt = bycript.genSaltSync();
    const password = bycript.hashSync(req.body.password, salt);
    user.password =  password;
    

    user.role = req.body.role;
    user.created_at = new Date();
    user.updated_at = new Date();

    user = await user.save();
    res.send(user);
    console.log(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error create user'});
    }

});

// User list

router.get('/', async function (req, res) {

    try {
        const users = await User.find();
        res.send(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error get users'});
    }
});

// PUT User

router.put('/:userId',[
    check('name', 'the name is require').not().isEmpty(),
    check('status', 'The status is require').isIn(['Active', 'Inactive']),
    check('email', 'the email is require').not().isEmpty(),
    check('password', 'the password is require').not().isEmpty(),
    check('role', 'the role is require').isIn(['Admin','Teacher'])
    
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Error update user'});
        }

        let user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(400).json({ 
                message: 'The user does not exist'});
        }

    const existUser = await User.findOne ({name : req.body.name, _id: { $ne: user._id }});
    if (existUser) {
        return res.status(400).json({ 
            message: 'The user already exist'});
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.status = req.body.status;

    const salt = bycript.genSaltSync();
    const password = bycript.hashSync(req.body.password, salt);
    user.password =  password;
    user.role = req.body.role;
    user.updated_at = new Date();

    user = await user.save();
    res.send(user);
    console.log(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error update user'});
    }

});

// DELETE Brand

router.delete('/:userId', async function (req, res) {

    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(400).json({ 
                message: 'The user does not exist'});
        }

        user = await User.finByIdAndDelete(req.params.userId);
        res.send(user);
        console.log(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error delete user'});
    }

});


module.exports = router;