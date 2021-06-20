const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Servidor : String,
    Canal : String, 
})

module.exports = mongoose.model('SancionesLogs', Schema)