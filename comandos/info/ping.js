const Discord = require('discord.js')


const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

module.exports = async (client, message, args) => { 
message.channel.send(`Mi ping es de: ${client.ws.ping}`)
}
