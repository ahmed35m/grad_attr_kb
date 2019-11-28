const mongoose = require('mongoose')

const GASchema = new mongoose.Schema ({
    
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true},
    number: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},
)

module.exports = mongoose.model('GA', GASchema)