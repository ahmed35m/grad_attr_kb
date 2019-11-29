const mongoose = require('mongoose')

const kbSchema = new mongoose.Schema({
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
    sub_ga: {
        number: mongoose.Schema.Types.Number,
        title: mongoose.Schema.Types.ObjectId,
    }
})

module.exports = mongoose.model('Kb', kbSchema)