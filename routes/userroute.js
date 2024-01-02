const express = require('express')
const router = express.Router()
const User = require('../model/usermodel')


// create route for user
router.route('/register').post(async (req, res)=>{
    let body = req.body
    switch (true) {
        case !body.name:
            return res.status(400).json({message: 'name is required'})
        case !body.email:
            return res.status(400).json({message: 'email is required'})
        case !body.password:
            return res.status(400).json({message: 'password is required'})
        default:
            break;
    }
    try {
        const user = await User.create(body)
        res.status(201).json({
            message: 'create user successfully', 
            timestamp: new Date().getTime(),
            data: user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server error'})
    }

})

router.route('/login').post(async (req, res)=>{
    let body = req.body

    switch (true) {
        case !body.email:
            return res.status(400).json({message: 'email is required'})
        case !body.password:
            return res.status(400).json({message: 'password is required'})
        default:
            break;
    }
    try {
        const user = await User.findOne({email: body.email})
        if (!user) {
            return res.status(404).json({message: 'Invalid credentials'})
        }
        
      
        res.status(200).json({
            message: 'login successfully', 
            timestamp: new Date().getTime(),
            data: user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server error'})
    }

})

module.exports = router