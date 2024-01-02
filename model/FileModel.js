const mongosse = require('mongoose')

// create schema
const fileSchema = new mongosse.Schema({
    file_name: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    url_image: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
    
})

// create model
const FileModel = mongosse.model('File', fileSchema)

module.exports = FileModel