const mongoose = require('mongoose');

let ModSchema = new mongoose.Schema({
    guildid: String,
    user: String,
    content: Array
});

const MessageModel = module.exports = mongoose.model('Moderation', ModSchema);