const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guild : String,
    prefix : String
})

module.exports = mongoose.model('prefix', Schema)