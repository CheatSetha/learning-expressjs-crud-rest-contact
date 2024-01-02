const mongosse = require('mongoose')

// create schema
const contactSchema = new mongosse.Schema({
    contact_name:{
        type: String,
        required: true,
    },
    contact_number:{
        type: String,
        required: true,
    },
    
})

// create model
const Contact = mongosse.model('Contact', contactSchema)

module.exports = Contact