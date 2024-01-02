const express = require('express')
const router = express.Router()
const Contact = require('../model/cotactModel')


router.route('/').get( async (req, res) => {
    let page = req.query.page || 1
    let limit = req.query.limit || 5
    let name = req.query.contact_name || ''
    let sort = req.query.sort || 'asc'
   try {
    const contacts = await Contact.find({
        contact_name: { $regex: new RegExp(name, 'i') } // Case-insensitive search for 'name' in 'contact_name' field
    })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ contact_name: sort });

    res.json({
        message: 'get all contacts successfully', 
        page,
        limit,
        total: contacts.length , 
        data: contacts})
    
   } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error'})
   }
})

router.route('/:id').get( async (req, res) => {
    try {
        const contact = await Contact.findOne({_id: req.params.id})
        if (!contact) {
            return res.status(404).json({message: 'contact not found'})
        }
        res.status(200).json({message: 'get contact by id successfully', data: contact})
        
       } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server error'})
       }
})

router.route('/').post(async(req, res) => {
    let body = req.body
    if (!body.contact_name || !body.contact_number) {
        return res.status(400).json({ message: 'body is required' })
    }
    try {
        const contact = await Contact.create(body)
        res.status(201).json({ message: 'create contact successfully', data: contact })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' })
    }

})
router.route('/:id').put( async(req, res) => {
    const contact = await Contact.findOne({_id: req.params.id})
   

    if (!contact) {
        return res.status(404).json({ message: 'contact not found' })
    }
    let body = req.body
    if (!body.contact_name || !body.contact_number) {
        return res.status(400).json({ message: 'body is required' })
    }
    try {
        const contact = await Contact.findOneAndUpdate({_id: req.params.id}, body, {new: true})
        res.status(200).json({ message: 'update contact successfully', data: contact })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' })
    }
})

router.route('/:id').delete( async(req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({_id: req.params.id})
        if (!contact) {
            return res.status(404).json({ message: 'contact not found' })
        }
        res.status(200).json({ message: 'delete contact successfully', data: contact })
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
})
// export router
module.exports = router