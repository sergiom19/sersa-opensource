const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Servidor : String,
    Canal : String,
    Categoria : String,
    Transcript : Array
})

module.exports = mongoose.model('TicketSystem', Schema)