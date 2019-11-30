const mongoose = require('mongoose')

const kbSchema = new mongoose.Schema({
   ga : {type: Object}
})

module.exports = mongoose.model('Kb', kbSchema)